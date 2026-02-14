const fs = require("fs");
const path = require("path");

const src = path.join(
  __dirname,
  "..",
  "node_modules",
  "@quicktoolsone",
  "pdf-compress",
  "dist",
  "pdf.js",
  "pdf.worker.min.mjs"
);
const destDir = path.join(__dirname, "..", "public", "pdf.js");
const dest = path.join(destDir, "pdf.worker.min.mjs");

if (fs.existsSync(src)) {
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log("PDF.js worker copiato in public/pdf.js/");
} else {
  console.warn("PDF worker non trovato, la libreria userà il CDN come fallback");
}
