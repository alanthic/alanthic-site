// Recorre _site y confirma que cada enlace interno, imagen, script y hoja de estilo exista.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
const archivos = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? archivos(p) : [p]; });
const html = archivos("_site").filter((p) => p.endsWith(".html") && !p.includes(join("_site", "pazo")));
const rotos = [];
for (const p of html) {
  const t = readFileSync(p, "utf8");
  for (const [, url] of t.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const r = join("_site", decodeURI(url));
    if (!(existsSync(r) && (statSync(r).isFile() || existsSync(join(r, "index.html"))))) rotos.push(`${p}: ${url}`);
  }
  for (const [, lista] of t.matchAll(/srcset="([^"]+)"/g)) for (const parte of lista.split(",")) {
    const url = parte.trim().split(" ")[0];
    if (url.startsWith("/") && !existsSync(join("_site", url))) rotos.push(`${p}: ${url}`);
  }
}
if (rotos.length) { console.error("verificar-enlaces: rotos\n" + [...new Set(rotos)].join("\n")); process.exit(1); }
console.log(`verificar-enlaces: ${html.length} páginas sin enlaces internos rotos.`);