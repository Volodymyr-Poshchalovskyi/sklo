import galleryBlur from "@/data/galleryBlur";

// Blur-up loading for gallery media. Each render has a 16px webp in
// galleryBlur.js (scripts/media/build-blur-placeholders.mjs), painted as the
// tile's background and stretched by the browser's own smooth scaling into a
// soft preview of the image itself until the real file arrives.
//
// Deliberately a plain image, not next/image's SVG-with-feGaussianBlur: that
// filter is rasterised at the full tile size for every tile, and on a slow
// phone CPU rasterising 36 of them pushed the gallery's first paint back by
// more than a second.

export function blurStyle(src) {
  const data = galleryBlur[src];
  if (!data) return undefined;
  return {
    backgroundImage: `url("data:image/webp;base64,${data}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}

// Ref callback for an <img> that should fade in over its placeholder. The
// image stays visible in the server markup; only one that is still loading
// when this runs is hidden (data-loading) until its load or error event.
// A cached image — often loaded before React hydrates — is never hidden, so
// it can neither flash nor get stuck invisible. No React state involved.
export function fadeInOnLoad(img) {
  if (!img || img.complete) return;
  img.setAttribute("data-loading", "");
  const done = () => img.removeAttribute("data-loading");
  img.addEventListener("load", done, { once: true });
  img.addEventListener("error", done, { once: true });
}
