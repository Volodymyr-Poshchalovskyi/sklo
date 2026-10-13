"use client";
import { useSyncExternalStore } from "react";

// "sd" on a phone-sized viewport, on a slow or metered connection, or when
// the user asked for reduced data; "hd" otherwise. Read once per render via
// useSyncExternalStore so the server and the first client paint agree
// ("hd"), and the real answer arrives on hydration.
function readTier() {
  if (typeof window === "undefined") return "hd";
  const c = navigator.connection;
  if (c?.saveData) return "sd";
  if (c?.effectiveType && /(^|-)2g|3g/.test(c.effectiveType)) return "sd";
  if (window.innerWidth < 900) return "sd";
  return "hd";
}
const subscribe = (cb) => {
  window.addEventListener("resize", cb);
  navigator.connection?.addEventListener?.("change", cb);
  return () => {
    window.removeEventListener("resize", cb);
    navigator.connection?.removeEventListener?.("change", cb);
  };
};
export function useVideoTier() {
  return useSyncExternalStore(subscribe, readTier, () => "hd");
}
