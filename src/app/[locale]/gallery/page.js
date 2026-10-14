import GalleryClient from "./GalleryClient";
import { galleryItems } from "@/data/galleryData";
import { imageVariant, videoSrc, videoPoster } from "@/lib/media";
import { absoluteUrl, JsonLd, SITE_URL } from "@/lib/seo";
import { pickL } from "@/lib/i18n";

// A server component on purpose: awaiting `searchParams` opts the route out
// of prerendering, so `?filter=` is rendered on the server per request and
// the archive grid, headings and alt text arrive in the HTML instead of
// being filled in after hydration (see the note in GalleryClient).
export default async function GalleryPage({ params, searchParams }) {
  const { locale } = await params;
  await searchParams;
  // The renders that have a descriptive alt, as an ItemList of ImageObjects:
  // what Google Images and the AI engines read as "these are the works".
  const altOf = (i) => pickL(locale, i.alt, i.altDe, i.alt);
  const described = galleryItems.filter((i) => altOf(i)).slice(0, 48);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "SKLO Studio — selected work",
          url: absoluteUrl(`/${locale}/gallery`),
          numberOfItems: described.length,
          itemListElement: described.map((i, n) => ({
            "@type": "ListItem",
            position: n + 1,
            item:
              i.type === "video"
                ? {
                    "@type": "VideoObject",
                    name: altOf(i),
                    description: altOf(i),
                    contentUrl: videoSrc(i.src, "hd"),
                    thumbnailUrl: videoPoster(i.src),
                    uploadDate: "2026-10-12",
                    creator: { "@id": `${SITE_URL}/#organization` },
                  }
                : {
                    "@type": "ImageObject",
                    contentUrl: imageVariant(i.src, 1920),
                    thumbnailUrl: imageVariant(i.src, 640),
                    name: altOf(i),
                    description: altOf(i),
                    creator: { "@id": `${SITE_URL}/#organization` },
                    copyrightNotice: "© SKLO Studio",
                    creditText: "SKLO Studio",
                    license: absoluteUrl(`/${locale}/imprint`),
                    acquireLicensePage: absoluteUrl(`/${locale}/contact`),
                  },
          })),
        }}
      />
      <GalleryClient />
    </>
  );
}
