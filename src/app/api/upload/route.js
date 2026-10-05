import { handleUpload } from "@vercel/blob/client";
import {
  ALLOWED_CONTENT_TYPES,
  MAX_FILE_BYTES,
  isAllowedFile,
} from "@/lib/contact/validate";

// Lets the form know whether to show the picker at all.
export async function GET() {
  return Response.json({ enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN) });
}

// The browser uploads straight to Vercel Blob; this route only hands it a
// short-lived token that says what it may upload. Vercel functions cap a
// request body at 4.5MB, which is why the bytes never pass through here.
export async function POST(request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: "File storage is not configured." }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("inquiries/") || !isAllowedFile(pathname)) {
          throw new Error("File type not accepted.");
        }
        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_FILE_BYTES,
          // The random suffix is what keeps a public URL private in practice:
          // it cannot be guessed, only followed from the email.
          addRandomSuffix: true,
          validUntil: Date.now() + 10 * 60 * 1000,
        };
      },
      // No database to update — the email is the record.
      onUploadCompleted: async () => {},
    });
    return Response.json(json);
  } catch (err) {
    return Response.json({ error: err?.message || "Upload rejected." }, { status: 400 });
  }
}
