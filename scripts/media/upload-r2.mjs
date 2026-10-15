// Uploads a folder under /public to the R2 bucket, keeping the same path, so
// `/assets/gallery/x.webp` becomes `https://media.sklo.studio/assets/gallery/x.webp`.
//
//   node scripts/media/upload-r2.mjs public/assets/gallery [public/tours ...]
//   (folders or single files under public/)
//
// Reads R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT, R2_BUCKET from
// .env.local. Skips objects that already exist with the same size, so the
// script can be re-run after adding files. Everything is sent with a one-year
// immutable cache header: variant files never change in place — a new render
// is a new name.
import fs from "node:fs";
import path from "node:path";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime-types";

for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}
const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT } = process.env;
const BUCKET = process.env.R2_BUCKET || "sklo-media";
if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_ENDPOINT) throw new Error("R2_* env missing");

const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

const CONCURRENCY = 12;
const roots = process.argv.slice(2);
if (!roots.length) throw new Error("give folders under public/");

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (!e.name.startsWith(".")) yield p;
  }
}

const files = roots.flatMap((r) => (fs.statSync(r).isDirectory() ? [...walk(r)] : [r]));
let done = 0, skipped = 0, sent = 0, failed = 0;
const total = files.length;

async function uploadOne(file) {
  const key = path.relative("public", file).split(path.sep).join("/");
  const size = fs.statSync(file).size;
  try {
    const head = await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    if (head.ContentLength === size) { skipped++; return; }
  } catch { /* not there yet */ }
  const type = mime.lookup(file) || "application/octet-stream";
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: fs.createReadStream(file),
    ContentLength: size,
    ContentType: type,
    // HTML entry pages keep their name across rebuilds (index.html of a tour
    // or navigator), so they must not be cached as immutable — only the
    // hashed assets and media are.
    CacheControl: file.endsWith(".html") ? "public, max-age=300" : "public, max-age=31536000, immutable",
  }));
  sent += size;
}

const queue = [...files];
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) {
    const f = queue.shift();
    try { await uploadOne(f); } catch (e) { failed++; console.error("FAIL", f, e.message); }
    done++;
    if (done % 100 === 0 || done === total) console.log(`${done}/${total} · uploaded ${(sent / 1048576).toFixed(0)} MB · skipped ${skipped} · failed ${failed}`);
  }
}));
console.log(failed ? `DONE WITH ${failed} FAILURES` : "DONE");
