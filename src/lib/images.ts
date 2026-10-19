import fs from "node:fs";
import path from "node:path";

// Images are added to public/ as they are collected; render a placeholder until then.
export function imageExists(src?: string) {
  if (!src) return false;
  return fs.existsSync(path.join(process.cwd(), "public", src));
}
