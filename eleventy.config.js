import { I18nPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  // Lo que ya está registrado en tiendas y apps sale byte por byte (lo comprueba scripts/verificar-pazo.mjs).
  for (const ruta of ["pazo", "_redirects", "robots.txt", "favicon.svg", "favicon-32.png", "apple-touch-icon.png", "og-image.png", "og-en.png", "og-es.png", "og"]) {
    eleventyConfig.addPassthroughCopy(ruta);
  }

  // Fuentes autoalojadas: solo el subconjunto latino (incluye tildes, ñ, ¿ y ¡).
  const f = "node_modules/@fontsource";
  const fv = "node_modules/@fontsource-variable";
  eleventyConfig.addPassthroughCopy({
    [`${f}/schibsted-grotesk/files/schibsted-grotesk-latin-{400,500,600,700}-normal.woff2`]: "fonts",
    [`${fv}/archivo/files/archivo-latin-wdth-{normal,italic}.woff2`]: "fonts",
    [`${fv}/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2`]: "fonts/bricolage-grotesque-latin-opsz-normal.woff2",
    [`${fv}/dm-sans/files/dm-sans-latin-opsz-normal.woff2`]: "fonts/dm-sans-latin-opsz-normal.woff2",
    [`${f}/source-sans-3/files/source-sans-3-latin-400-normal.woff2`]: "fonts/source-sans-3-latin-400-normal.woff2",
  });
  eleventyConfig.addPassthroughCopy({ "src/css": "css", "src/js": "js" });

  // EN en /, ES en /es/. page.lang sale de la ruta.
  eleventyConfig.addPlugin(I18nPlugin, { defaultLanguage: "en" });

  // {% t "English", "Español" %}: el texto en el idioma de la página.
  eleventyConfig.addShortcode("t", function (en, es) {
    return this.page.lang === "es" ? es : en;
  });

  // Cada <img> local sale como <picture> con AVIF, WebP y PNG, a 360 y 720 px.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "auto"],
    widths: [360, 720],
    htmlOptions: {
      imgAttributes: { loading: "lazy", decoding: "async" },
      pictureAttributes: {},
    },
    sharpOptions: {},
    sharpAvifOptions: { quality: 50 },
    sharpWebpOptions: { quality: 75 },
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
  };
}
