# Cloudflare — DNS and media storage

Since 12 October 2026 the domain `sklo.studio` is managed through Cloudflare,
and the website's large media (gallery renders, films, the 360° tours — about
1.9 GB) is served from Cloudflare R2 at `https://media.sklo.studio`. The
website itself still runs on Vercel; only the media moved.

Why: Vercel's free plan includes 100 GB of traffic per month, and a gallery
page alone weighs several megabytes. R2 charges nothing for traffic and has a
free allowance of 10 GB of storage, so the media costs CHF 0 at any visitor
count. Cloudflare asks for a payment method when R2 is switched on; it bills
only usage above the allowance.

## What exists

| Item | Where | Notes |
|---|---|---|
| Cloudflare account | `sklo.rendering@gmail.com` | owns everything below; developer invited as Administrator (can be reduced later) |
| Zone `sklo.studio` | Cloudflare → Domains | DNS for the domain. The registrar is still Porkbun; only the nameservers point at Cloudflare. |
| R2 bucket `sklo-media` | Cloudflare → R2 | jurisdiction **EU**, public through the custom domain below |
| Custom domain `media.sklo.studio` | R2 → `sklo-media` → Settings → Custom Domains | Cloudflare created the DNS record itself |
| Cache rule `media` | Caching → Cache Rules | hostname = `media.sklo.studio`, eligible for cache, TTL from the file's own header (one year) |
| API token `sklo-upload` | R2 → Manage R2 API Tokens | Object Read & Write on `sklo-media` only; used by the upload script, never by the website |

## DNS rules of thumb

Every DNS record for the website, email and the media domain is set to
**DNS only** (grey cloud), not proxied (orange cloud). Vercel manages its own
TLS certificate and Resend's records are verification records — proxying any
of them breaks things. Only `media.sklo.studio` goes through Cloudflare's
network, and Cloudflare manages that record itself.

When Vercel's domain setup asks for records (`A` for `sklo.studio`, `CNAME`
for `www`), they are added here in Cloudflare → DNS, as DNS only.

## Uploading media (developer)

Files in the bucket keep the same paths as they had under `public/`, so
`/assets/gallery/exterior/001-1280.webp` is served at
`https://media.sklo.studio/assets/gallery/exterior/001-1280.webp`. The website
builds these URLs from the `NEXT_PUBLIC_MEDIA_URL` environment variable
(set to `https://media.sklo.studio` in Vercel; leave it empty to serve from
`public/` during local work on a copy of the files).

```
node scripts/media/upload-r2.mjs public/assets/gallery public/tours
```

- reads `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT` from
  `.env.local` (`R2_BUCKET` defaults to `sklo-media`);
- the endpoint for an EU-jurisdiction bucket is
  `https://<account-id>.eu.r2.cloudflarestorage.com` — the plain
  `.r2.cloudflarestorage.com` host answers `403 Access Denied` for it;
- every object is sent with its content type and
  `Cache-Control: public, max-age=31536000, immutable`;
- objects already in the bucket with the same size are skipped, so the
  script can be re-run after adding files or after an interrupted upload.

New gallery renders therefore go: run the variant generators
(`scripts/media/build-image-variants.mjs`, `encode-video-variants.sh`) on the
new files in a local `public/assets/gallery/...` folder, run the upload
script, then add the entries to `src/data/galleryData.js`. Because the cache
header says "immutable", a changed file must get a new name — re-uploading
under the same name leaves the old version in browsers and on the edge for up
to a year (Caching → Purge Cache fixes the edge, not visitors' browsers).

The originals and a copy of everything in the bucket are kept outside the
repository in `~/Documents/SKLO-media-masters/` on the developer's machine.

### Interactive exports: tours and navigators

The Panotour exports live under `tours/` in the bucket and the apartment
navigator (the "Luxe 17" demo, its own small Next.js app) under
`navigators/luxe17/`. Both are embedded on sklo.studio in an iframe that
points at `https://media.sklo.studio/...`, so they load from R2, not from the
website's deployment. The navigator's source (with the SKLO branding, webp
frames and the `basePath: /navigators/luxe17` export settings) is kept in
`~/Documents/SKLO-media-masters/navigators/luxe17-src/`; to update it, edit
there, run `npm run build`, copy `out/` to `public/navigators/<folder>/` and run
`node scripts/media/upload-r2.mjs public/navigators/<folder>`. The live
build is `navigators/luxe17-v2/` (basePath in its `next.config.mjs`); its
frames still load from the first upload at `navigators/luxe17/oblit/`. HTML
files are uploaded with a five-minute cache, everything else as immutable —
so a rebuild under the same folder is picked up, but bumping the folder name
(and the `entry` in `SERVICE_TOUR`) is the safe way to replace an app whose
old index.html was uploaded before that rule (2026-10-15). A new navigator for
another project follows the same path with its own folder name and an entry
in `SERVICE_TOUR` in `src/data/galleryData.js`.

## What this costs

| | Free allowance | Expected use |
|---|---|---|
| Storage | 10 GB / month | ~1.9 GB |
| Reads (visitors loading media) | 10 million / month | well under 1 million |
| Writes (uploads by the developer) | 1 million / month | a few thousand |
| Traffic out | unlimited, free | — |

Above the allowance: USD 0.015 per GB stored per month. Even at four times the
expected storage the bill would be under USD 1.
