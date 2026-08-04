"use client";
import { createContext, useContext } from "react";

// Holds a stable ref object ({ current: Lenis | null }), not the instance
// itself — ClientWrapper mounts/unmounts Lenis per-route, so a plain context
// value would force every consumer to re-render on navigation. Consumers
// read `.current` at call time (e.g. inside a click handler) instead.
export const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}
