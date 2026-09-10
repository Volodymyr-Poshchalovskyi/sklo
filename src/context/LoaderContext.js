"use client";
import { createContext } from "react";

// `null` rather than `false` so a consumer can tell "there is no loader gate
// above me" apart from "the gate is still closed". Footer renders outside
// ClientWrapper's provider (see the root layout), and with a `false` default it
// could not distinguish the two — its scroll-reveal animations waited forever
// on a loader that was never going to report ready.
//
// Every consumer inside the provider is unaffected: they read the real boolean,
// and the ones that only test truthiness treat `null` exactly like `false`.
export const LoaderContext = createContext(null);
