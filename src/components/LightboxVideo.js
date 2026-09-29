"use client";
import { useEffect, useRef } from "react";

// The films are sold with their soundtrack, so the viewer gets it — but at
// half volume, because a gallery is browsed, not attended, and landing on a
// clip at full blast is how people close a tab.
const DEFAULT_VOLUME = 0.5;

/**
 * The player behind both lightboxes.
 *
 * Playback is started here rather than through the `autoPlay` attribute: the
 * volume, the mute state and the start position all have to be set before the
 * first frame, and an attribute gives no say in that order.
 *
 * Opening a lightbox is a click, which is the user gesture browsers ask for
 * before they allow sound, so unmuted playback normally goes through. When it
 * does not — a policy that counts gestures differently, an embedded context —
 * the catch falls back to muted rather than leaving a frozen frame.
 */
export default function LightboxVideo({ src, start, className }) {
  const ref = useRef(null);

  const begin = () => {
    const el = ref.current;
    if (!el) return;
    el.volume = DEFAULT_VOLUME;
    // `start` skips a fade-in from black; see the note in galleryData.js.
    if (start && el.currentTime < start) el.currentTime = start;
    el.muted = false;
    el.play().catch(() => {
      el.muted = true;
      el.play().catch(() => {});
    });
  };

  // Same reason as the gallery tiles: the metadata can arrive before React
  // attaches its handler, and then the prop below never fires.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.readyState >= 1) {
      begin();
      return;
    }
    el.addEventListener("loadedmetadata", begin, { once: true });
    return () => el.removeEventListener("loadedmetadata", begin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, start]);

  return (
    <video
      ref={ref}
      src={src}
      onLoadedMetadata={begin}
      controls
      loop
      playsInline
      className={className}
    />
  );
}
