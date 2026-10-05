import { formatBytes, INLINE_ATTACH_TOTAL_BYTES } from "./validate";

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const row = (label, value) =>
  `<tr>
    <td style="padding:6px 12px 6px 0;color:#6b6e78;font-size:12px;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap">${esc(label)}</td>
    <td style="padding:6px 0;color:#15151a;font-size:14px;line-height:1.5">${value}</td>
  </tr>`;

const lines = (arr, fallback = "—") =>
  arr && arr.length ? arr.map((x) => esc(x)).join("<br>") : fallback;

// One email for both forms. The subject tells the two apart in the inbox
// list; the body shows only the sections that have content, so the quick
// form does not arrive as a wizard email full of dashes.
export function buildInquiryEmail(d) {
  const isWizard = d.kind === "wizard";
  const subject = isWizard
    ? `New project inquiry — ${d.projectName || d.company || d.name}`
    : `Message from the website — ${d.name}`;

  const fileRows = d.files.length
    ? `<ul style="margin:0;padding-left:18px">${d.files
        .map(
          (f) =>
            `<li style="margin:2px 0"><a href="${esc(f.url)}" style="color:#15151a">${esc(f.name)}</a> <span style="color:#6b6e78">(${formatBytes(f.size)})</span></li>`
        )
        .join("")}</ul>`
    : "—";

  const html = `<!doctype html><html><body style="margin:0;background:#f4f3ef;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">
  <div style="max-width:620px;margin:0 auto;padding:32px 20px">
    <div style="background:#ffffff;border:1px solid #e3e1da;border-radius:16px;padding:28px">
      <p style="margin:0 0 4px;color:#6b6e78;font-size:11px;text-transform:uppercase;letter-spacing:.14em">sklo.studio · ${isWizard ? "Project inquiry" : "Quick message"} · ${d.locale.toUpperCase()}</p>
      <h1 style="margin:0 0 20px;font-size:20px;color:#15151a">${esc(isWizard ? d.projectName || "Untitled project" : d.name)}</h1>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
        ${row("Name", esc(d.name))}
        ${d.company ? row("Company", esc(d.company)) : ""}
        ${row("Email", `<a href="mailto:${esc(d.email)}" style="color:#15151a">${esc(d.email)}</a>`)}
        ${d.phone ? row("Phone", esc(d.phone)) : ""}
        ${isWizard ? row("Services", lines(d.services)) : ""}
        ${isWizard ? row("Budget", esc(d.budget || "—")) : ""}
        ${isWizard ? row("Timeline", `${esc(d.startDate || "—")} → ${esc(d.endDate || "—")}`) : ""}
        ${isWizard ? row("Materials", lines(d.materials)) : ""}
        ${isWizard && d.consultAreas.length ? row("Consultation", esc(d.consultAreas.join(", "))) : ""}
        ${row("Files", fileRows)}
      </table>
      ${
        d.message
          ? `<div style="margin-top:20px;padding-top:16px;border-top:1px solid #e3e1da">
               <p style="margin:0 0 6px;color:#6b6e78;font-size:12px;text-transform:uppercase;letter-spacing:.08em">${isWizard ? "Additional information" : "Message"}</p>
               <p style="margin:0;color:#15151a;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(d.message)}</p>
             </div>`
          : ""
      }
    </div>
    <p style="margin:14px 4px 0;color:#9a9ca4;font-size:11px">Reply to this email to answer ${esc(d.name)} directly.</p>
  </div></body></html>`;

  const text = [
    `${isWizard ? "Project inquiry" : "Quick message"} (${d.locale})`,
    `Name: ${d.name}`,
    d.company && `Company: ${d.company}`,
    `Email: ${d.email}`,
    d.phone && `Phone: ${d.phone}`,
    isWizard && `Project: ${d.projectName || "—"}`,
    isWizard && `Services:\n${d.services.length ? d.services.map((s) => `  - ${s}`).join("\n") : "  —"}`,
    isWizard && `Budget: ${d.budget || "—"}`,
    isWizard && `Timeline: ${d.startDate || "—"} → ${d.endDate || "—"}`,
    isWizard && `Materials: ${d.materials.join(", ") || "—"}`,
    isWizard && d.consultAreas.length && `Consultation requested for: ${d.consultAreas.join(", ")}`,
    `Files:\n${d.files.length ? d.files.map((f) => `  - ${f.name} (${formatBytes(f.size)}) ${f.url}`).join("\n") : "  —"}`,
    d.message && `\n${isWizard ? "Additional information" : "Message"}:\n${d.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  // Small sets ride along as real attachments; the links above stay either way.
  const total = d.files.reduce((n, f) => n + f.size, 0);
  const attachments =
    d.files.length && total <= INLINE_ATTACH_TOTAL_BYTES
      ? d.files.map((f) => ({ filename: f.name, path: f.url }))
      : [];

  return { subject, html, text, attachments };
}
