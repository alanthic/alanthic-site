import subsetFont from 'subset-font';
import { readFileSync, writeFileSync } from 'node:fs';
// Uso: node scripts/subconjunto-fuentes.mjs (después de npm install). Si cambia el nombre de una app, se regenera.
const nm = 'node_modules/@fontsource-variable';
const out = 'src/fonts';
// Cada letra de cuarto solo escribe el nombre de su app.
const tareas = [
  ['archivo/files/archivo-latin-wdth-italic.woff2', 'archivo-nombre-italic.woff2', 'Pazo Run'],
  ['bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2', 'bricolage-nombre.woff2', 'Collecty'],
  ['dm-sans/files/dm-sans-latin-opsz-normal.woff2', 'dm-sans-nombre.woff2', 'Kittsu'],
  // Kintal: el nombre y el aviso de la tienda, en los dos idiomas.
  ['archivo/files/archivo-latin-wdth-normal.woff2', 'archivo-kintal.woff2', 'Kintal The store opens soon. La tienda abre pronto.'],
];
for (const [src, dst, texto] of tareas) {
  const buf = await subsetFont(readFileSync(`${nm}/${src}`), texto, { targetFormat: 'woff2' });
  writeFileSync(`${out}/${dst}`, buf);
  console.log(dst, (buf.length / 1024).toFixed(1) + ' KB');
}