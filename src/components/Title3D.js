"use client";
import { useContext, useRef } from "react";
import { LoaderContext } from "@/context/LoaderContext";
import useRevealOnSettle from "@/hooks/useRevealOnSettle";

// Shared 3D section heading. `.title-3d` on its own only sets the color — the
// stacked text-shadow that makes the depth lives in the `pop3D` keyframes, so
// a heading needs BOTH classes to actually look 3D. Wrapping that pairing (and
// the scroll-reveal that triggers it) here keeps every section heading on the
// site identical instead of re-deriving the combination at each call site.
export default function Title3D({ as: Tag = "h2", className = "", children, ...rest }) {
  const ref = useRef(null);
  // Footer renders outside ClientWrapper, so there is no loader to wait on
  // there and the context reports `null`. Without this fallback the reveal
  // never fires and the heading stays permanently flat — `.title-3d` alone
  // carries no shadow.
  const loaderReady = useContext(LoaderContext);
  const inView = useRevealOnSettle(ref, loaderReady ?? true);

  return (
    <Tag
      ref={ref}
      className={`title-3d ${inView ? "animate-pop-3d" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
