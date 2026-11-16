// Falla el build si algo registrado en tiendas y apps cambió al pasar por Eleventy:
// cada archivo de pazo/** y los redirects de Kittsu deben salir byte por byte.
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const hash = (p) => createHash("sha256").update(readFileSync(p)).digest("hex");
const archivos = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? archivos(p) : [p];
});

const revisar = [...archivos("pazo"), "_redirects", "robots.txt"];
const malos = revisar.filter((p) => {
  const salida = join("_site", p);
  return !existsSync(salida) || hash(p) !== hash(salida);
});

if (malos.length) {
  console.error("verificar-pazo: estos archivos no salieron idénticos:\n" + malos.map((p) => "  " + relative(".", p)).join("\n"));
  process.exit(1);
}
console.log(`verificar-pazo: ${revisar.length} archivos idénticos en _site.`);