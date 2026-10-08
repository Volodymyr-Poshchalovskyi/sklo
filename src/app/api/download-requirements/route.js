import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const rootPath = path.join(process.cwd(), "project requirements.pdf");
  const publicPath = path.join(process.cwd(), "public", "project requirements.pdf");

  const targetPath = fs.existsSync(rootPath) ? rootPath : publicPath;

  if (!fs.existsSync(targetPath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(targetPath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="project requirements.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}

