# alanthic-site

Sitio institucional de **Alanthic LLC** — [alanthic.co](https://alanthic.co)

HTML estático, sin build step. Se edita directo y se publica.

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

## Estructura

- `index.html` — landing del estudio
- `privacy.html` / `terms.html` / `delete-account.html` — legales heredados (ver arriba)
