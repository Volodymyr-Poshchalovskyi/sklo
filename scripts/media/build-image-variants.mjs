// Generates the responsive variants every image on the site is served from.
//
//   public/assets/gallery/exterior/001.webp
//   → 001-640.webp  001-1280.webp  001-1920.webp  001-2560.webp
//
// `src/lib/media.js` maps a base path to these names, so the data files keep
// pointing at `001.webp` and the browser picks a width through srcset. The
// unsuffixed original is deleted afterwards: the 3840px masters live in
// "images for gallery/" (and on R2 as an archive), not in the deploy.
//
// Usage: node scripts/media/build-image-variants.mjs [--keep-originals]
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Only the gallery archive: everything else under /assets is a UI asset
// referenced by its exact file name (service tiles, tour posters, icons).
const ROOT = path.resolve("public/assets/gallery");
const WIDTHS = [640, 1280, 1920, 2560];
const QUALITY = 80;
const KEEP = process.argv.includes("--keep-originals");
const SKIP_DIRS = [];
const SKIP_FILES = new Set();

const isVariant = (name) => /-(640|1280|1920|2560)\.webp$/.test(name);

async function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let made = 0, skipped = 0, removed = 0;
for await (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  if (SKIP_DIRS.some((d) => rel.startsWith(d))) continue;
  if (SKIP_FILES.has(path.basename(file))) continue;
  if (!/\.(webp|jpe?g|png)$/i.test(file) || isVariant(file) || /-poster\.webp$/.test(file)) continue;

  const base = file.replace(/\.(webp|jpe?g|png)$/i, "");
  const meta = await sharp(file).metadata();
  for (const w of WIDTHS) {
    const out = `${base}-${w}.webp`;
    if (fs.existsSync(out)) { skipped++; continue; }
    // Never upscale: a 1920px source gets a 2560 "variant" that is just the
    // source, so srcset still has every entry it expects.
    const width = Math.min(w, meta.width);
    await sharp(file).resize({ width }).webp({ quality: QUALITY, effort: 4 }).toFile(out);
    made++;
  }
  if (!KEEP) { fs.unlinkSync(file); removed++; }
}
console.log(`variants made: ${made}, already present: ${skipped}, originals removed: ${removed}`);
