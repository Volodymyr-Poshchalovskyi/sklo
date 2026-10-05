# Contact form — setup and handover

Both forms on sklo.studio (the five-step inquiry on `/contact` and the short
form in the footer) send email through [Resend](https://resend.com) and store
attached files in [Vercel Blob](https://vercel.com/docs/storage/vercel-blob).
There is no database and nothing to run: the code lives in the site itself and
Vercel executes it on demand.

Three environment variables control everything. They are set in the Vercel
dashboard under **Project → Settings → Environment Variables** and take effect
on the next deployment (**Deployments → ⋯ → Redeploy**).

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Lets the site send email. Without it both forms show "Sending failed". |
| `CONTACT_TO` | Where inquiries are delivered. Several addresses: `a@x.ch, b@x.ch`. |
| `CONTACT_FROM` | The sender shown in the inbox. Leave empty until the domain is verified (step 2). |
| `BLOB_READ_WRITE_TOKEN` | Lets visitors attach files. Without it the file picker is hidden; the forms still work. |

---

## 1. Test mode (works today, no domain needed)

1. Create a free account at https://resend.com with the address that should
   receive the inquiries during testing.
2. **API Keys → Create API Key** (permission: *Sending access*). Copy the key —
   it is shown once.
3. In Vercel set `RESEND_API_KEY` to that key and `CONTACT_TO` to the same
   email address the Resend account was created with. Redeploy.

In test mode Resend sends from its shared address `onboarding@resend.dev` and
**only delivers to the account owner's address**. Anything else is rejected.
That is enough to see the forms working end to end.

Free plan: 3,000 emails per month, 100 per day.

## 2. Production: sending from sklo.studio

This step needs access to the DNS records of `sklo.studio` (wherever the domain
is registered: Hostpoint, Infomaniak, Cloudflare, …).

1. In Resend: **Domains → Add Domain → `sklo.studio`**. Pick the region
   *Europe (Ireland)*.
2. Resend lists three or four DNS records (one MX and TXT for SPF, one TXT for
   DKIM, optionally one for DMARC). Add each of them at the domain registrar
   exactly as shown — same name, same type, same value.
3. Back in Resend press **Verify**. Propagation takes anywhere from a few
   minutes to a day; the status turns to *Verified*.
4. In Vercel set

   ```
   CONTACT_FROM = SKLO Studio <inquiries@sklo.studio>
   CONTACT_TO   = info@sklo.studio
   ```

   `inquiries@` does not need to exist as a mailbox — it is only the sender
   name. Replies go to the visitor's own address automatically.
5. Redeploy. Send a test inquiry and check that it lands in `info@sklo.studio`
   and not in Spam. The DKIM record is what keeps it out of Spam, so if it
   does land there, re-check that record.

## 3. File attachments (Vercel Blob)

1. In Vercel: **Storage → Create Database → Blob**, any name, connect it to the
   project. Vercel adds `BLOB_READ_WRITE_TOKEN` to the environment variables by
   itself.
2. Redeploy. The file picker appears on step 4 of the inquiry form.

How it behaves:

- Files upload the moment the visitor picks them, directly from the browser to
  storage, so a 150 MB plan does not go through the website's own servers.
- Up to 10 files, 200 MB each, 500 MB per inquiry. Accepted: PDF, images,
  common CAD and 3D formats (DWG, DXF, SKP, 3DS, MAX, FBX, OBJ, Blender, IFC,
  Revit, ArchiCAD), Office documents.
- The email lists every file with a download link. When the files together are
  under 10 MB they are also attached to the email itself.
- Links are unguessable but not password-protected — the same model as a
  Dropbox or WeTransfer link. Anyone who has the email can download.
- Free (Hobby) plan: 500 MB of storage, 1 GB of downloads per month. Files are
  not deleted automatically; to free space, delete old ones under
  **Storage → Blob → Browser**. On a Pro plan the limits are far higher.

## 4. Spam

The forms carry a hidden field that only bots fill in and reject anything
submitted faster than three seconds after the page opened. In practice this
stops the automated traffic that hits every contact form. If spam still gets
through, the next step is Cloudflare Turnstile (free, no puzzles for visitors);
it needs a Cloudflare account and about an hour of work.

## 5. Notes

- Vercel's Hobby plan is for personal, non-commercial projects under Vercel's
  terms. A studio website is commercial use; Vercel's Pro plan is USD 20 per
  month per member. Worth settling before launch.
- Changing the receiving address later is a one-line change of `CONTACT_TO`
  in Vercel, followed by a redeploy.
- Resend keeps a log of every email sent (**Emails** in the dashboard) with
  delivery status — the first place to look if something "never arrived".
