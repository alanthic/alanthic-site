# alanthic-site

Sitio institucional de **Alanthic LLC** — [alanthic.co](https://alanthic.co)

Eleventy 3 genera HTML plano en `_site/` (`npm run build`; `npm run dev` sirve en el puerto 8090).
Inglés en `/` y español en `/es/`; los textos van en par con `{% t "English", "Español" %}`.
Enlaces de tiendas, legales y correo: `src/_data/sitio.js`.

`pazo/`, `_redirects` y `robots.txt` pasan sin tocar, y `scripts/verificar-pazo.mjs`
hace fallar el build si alguno no sale byte por byte idéntico.

## Deploy

Netlify (free tier), sitio `alanthic.netlify.app`.
Dominio y DNS en Namecheap — **no** en Cloudflare: los registros MX de Google
Workspace viven en Namecheap y cambiar nameservers implicaría migrarlos.

- A `@` → `75.2.60.5`
- CNAME `www` → `alanthic.netlify.app`
- SSL: Let's Encrypt, renovación automática por Netlify

## Legales

Los legales de Kittsu viven en kittsu.com (`/privacy`, `/terms`,
`/delete-account`) y son las URLs registradas en Play Console y App Store
Connect. Este sitio ya no aloja ninguno.

Las rutas `privacy.html`, `terms.html` y `delete-account.html` existieron aqui
cuando el producto se llamaba 10Life. Se eliminaron, y `_redirects` las manda
con 301 a kittsu.com para no romper builds viejas de la app ni marcadores.
No reutilices esos nombres de archivo.

### Pazo Run

Los legales de Pazo Run viven aqui, en `/pazo/` (ingles) y `/pazo/es/` (espanol):
`privacy/`, `health-data/` (politica de datos de salud de Washington, MHMDA: enlazada
desde la portada como exige la ley), `terms/` (tambien sirve de EULA en las tiendas),
`delete-account/` (URL de borrado de Play) y `support/` (Support URL de App Store).
Cada pagina es `index.html` en su carpeta, con estilos en `pazo/legal.css`. Son las URLs
registradas en las tiendas y en la app (`src/constants/links.ts` del repo RunApp): no
las renombres. Contacto: support@alanthic.co.

## Estructura

- `src/_includes/inicio.njk` — el inicio (EN y ES salen de la misma plantilla)
- `src/_includes/base.njk` — cabecera: SEO, hreflang, OG, favicon
- `src/css/sitio.css` — la Vitrina (tokens en `alanthic-brand/vitrina/tokens.css`)
- `src/js/casa.js` — la casa toma el color de cada cuarto; copiar el correo
- `src/img/` — pantallas y logos; Eleventy las sirve en AVIF, WebP y PNG
- `pazo/` — legales de Pazo Run (ver arriba)
- Formulario de contacto: Netlify Forms (`contacto`), con página de gracias en cada idioma