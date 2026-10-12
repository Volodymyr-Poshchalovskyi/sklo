import galleryBlur from "@/data/galleryBlur";

// Blur-up loading for gallery media. Each render has a 16px webp in
// galleryBlur.js (scripts/media/build-blur-placeholders.mjs); wrapped in an
// SVG Gaussian blur it becomes a soft preview of the image itself, painted
// as the tile's background until the real file arrives. The blur is
// rasterised once by the browser — no CSS filter layer to recomposite on
// every scroll frame. Same technique as next/image's placeholder="blur".

export function blurStyle(src, width = 16, height = 9) {
  const data = galleryBlur[src];
  if (!data) return undefined;
  const w = 320;
  const h = Math.round((w * height) / width) || 180;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}'>` +
    `<filter id='b' color-interpolation-filters='sRGB'><feGaussianBlur stdDeviation='20'/>` +
    `<feComponentTransfer><feFuncA type='discrete' tableValues='1 1'/></feComponentTransfer></filter>` +
    `<image width='100%' height='100%' preserveAspectRatio='none' filter='url(#b)' href='data:image/webp;base64,${data}'/></svg>`;
  return {
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`,
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
