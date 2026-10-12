import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// One requirements sheet per language. `?lang=de` serves the German one;
// anything else falls back to English.
const FILES = {
  en: { file: "project-requirements.pdf", name: "project requirements.pdf" },
  de: { file: "projektanforderungen.pdf", name: "Projektanforderungen.pdf" },
};

export async function GET(request) {
  const lang = new URL(request.url).searchParams.get("lang") === "de" ? "de" : "en";
  const { file, name } = FILES[lang];
  const target = path.join(process.cwd(), "public", file);

  if (!fs.existsSync(target)) {
    return new NextResponse("File not found", { status: 404 });
  }

  return new NextResponse(fs.readFileSync(target), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${name}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
