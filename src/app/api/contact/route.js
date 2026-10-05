import { Resend } from "resend";
import { validateInquiry } from "@/lib/contact/validate";
import { buildInquiryEmail } from "@/lib/contact/email";

// Until the studio's domain is verified in Resend, mail goes out from
// Resend's shared test sender and can only be delivered to the address that
// owns the Resend account. Both values move to env vars so the switch to
// `inquiries@sklo.studio` → `info@sklo.studio` is a dashboard change, not a
// deploy. See docs/CONTACT_FORM_SETUP.md.
const FROM = process.env.CONTACT_FROM || "SKLO Studio <onboarding@resend.dev>";
const TO = (process.env.CONTACT_TO || "volodumer2005@gmail.com")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export async function POST(request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: "Mail is not configured." }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const result = validateInquiry(body);
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  const { subject, html, text, attachments } = buildInquiryEmail(result.data);
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: result.data.email,
    subject,
    html,
    text,
    attachments,
  });

  if (error) {
    console.error("[contact] resend failed:", error);
    return Response.json({ error: "Could not send the message." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
