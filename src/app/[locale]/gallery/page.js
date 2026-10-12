import GalleryClient from "./GalleryClient";

// A server component on purpose: awaiting `searchParams` opts the route out
// of prerendering, so `?filter=` is rendered on the server per request and
// the archive grid, headings and alt text arrive in the HTML instead of
// being filled in after hydration (see the note in GalleryClient).
export default async function GalleryPage({ searchParams }) {
  await searchParams;
  return <GalleryClient />;
}
