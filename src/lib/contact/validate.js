// Shared rules for both forms. The browser enforces the same limits before
// upload so the visitor hears about an oversized file at pick time, but the
// server is the authority: anything can call the API, not just our page.

export const MAX_FILE_BYTES = 200 * 1024 * 1024; // one plan or model
export const MAX_TOTAL_BYTES = 500 * 1024 * 1024; // everything in one request
export const MAX_FILES = 10;

// Attachments go inline in the email only while they stay well under the mail
// providers' own caps (Gmail rejects at 25MB). Past that the email carries
// links instead — the files are already in storage, so nothing is lost.
export const INLINE_ATTACH_TOTAL_BYTES = 10 * 1024 * 1024;

// What a visualisation studio actually receives: plans, references, models.
// Executables and archives are left out on purpose — an archive hides what is
// inside it, and nothing a client sends us legitimately needs to be one.
export const ALLOWED_EXTENSIONS = [
  "pdf",
  "jpg", "jpeg", "png", "webp", "heic", "heif", "tif", "tiff", "gif",
  "dwg", "dxf", "skp", "3ds", "max", "fbx", "obj", "blend", "ifc", "rvt", "pln",
  "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt",
];

// Media types the Blob token will accept. CAD formats mostly arrive as
// application/octet-stream (the browser has no better guess), so that has to be
// on the list — the extension check above is what keeps it honest.
export const ALLOWED_CONTENT_TYPES = [
  "application/pdf",
  "image/*",
  "application/octet-stream",
  "application/acad", "application/x-acad", "application/dxf", "image/vnd.dwg",
  "application/x-koan", "model/*",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
];

export function fileExtension(name = "") {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}

export function isAllowedFile(name) {
  return ALLOWED_EXTENSIONS.includes(fileExtension(name));
}

export function isEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return "";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}

const clip = (value, max) => (typeof value === "string" ? value.trim().slice(0, max) : "");

// Returns { ok: true, data } or { ok: false, error }. `data` is the cleaned
// payload the mail builder can trust: every string clipped, every list typed.
export function validateInquiry(body) {
  if (!body || typeof body !== "object") return { ok: false, error: "Empty request." };

  // Honeypot: a field no human sees. Bots fill every input they find.
  if (body.website) return { ok: false, error: "Rejected." };

  // A human needs a few seconds to get through even the shortest form.
  const started = Number(body.startedAt);
  if (!Number.isFinite(started) || Date.now() - started < 3000) {
    return { ok: false, error: "Rejected." };
  }

  const kind = body.kind === "quick" ? "quick" : "wizard";
  const name = clip(body.name, 120);
  const email = clip(body.email, 200);
  if (!name) return { ok: false, error: "Name is required." };
  if (!isEmail(email)) return { ok: false, error: "A valid email address is required." };

  const files = Array.isArray(body.files) ? body.files.slice(0, MAX_FILES) : [];
  let total = 0;
  for (const f of files) {
    if (!f || typeof f.url !== "string" || typeof f.name !== "string") {
      return { ok: false, error: "Malformed file entry." };
    }
    // Only our own storage. A link to anywhere else is someone using our
    // mailer to deliver their URL to the studio's inbox.
    if (!/^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//.test(f.url)) {
      return { ok: false, error: "File URL not accepted." };
    }
    if (!isAllowedFile(f.name)) return { ok: false, error: `File type not accepted: ${f.name}` };
    const size = Number(f.size) || 0;
    if (size > MAX_FILE_BYTES) return { ok: false, error: `File too large: ${f.name}` };
    total += size;
  }
  if (total > MAX_TOTAL_BYTES) return { ok: false, error: "Attachments exceed the total size limit." };

  const data = {
    kind,
    locale: body.locale === "de" ? "de" : "en",
    name,
    email,
    company: clip(body.company, 160),
    phone: clip(body.phone, 60),
    projectName: clip(body.projectName, 160),
    message: clip(body.message, 5000),
    files: files.map((f) => ({
      name: clip(f.name, 200),
      size: Number(f.size) || 0,
      url: f.url,
    })),
  };

  if (kind === "wizard") {
    const list = (v, max) =>
      Array.isArray(v) ? v.filter((x) => typeof x === "string").map((x) => x.slice(0, 160)).slice(0, max) : [];
    data.services = list(body.services, 20); // "Label: 2x" lines, already formatted
    data.budget = clip(body.budget, 80);
    data.startDate = clip(body.startDate, 40);
    data.endDate = clip(body.endDate, 40);
    data.materials = list(body.materials, 10);
    data.consultAreas = list(body.consultAreas, 6);
  }

  return { ok: true, data };
}
