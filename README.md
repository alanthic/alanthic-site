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

## ⚠️ Antes de renombrar o borrar archivos

`privacy.html`, `terms.html` y `delete-account.html` son remanentes del nombre
viejo del producto (**10Life**, hoy **Kittsu**). Los legales vigentes de Kittsu
viven en `kittsu.com/privacy`, `/terms` y `/delete-account`.

Antes de borrarlos, confirmar que Play Console y App Store Connect apunten a
`kittsu.com` y no a estas rutas. Si una consola apunta acá y se borra el
archivo, se rompe la ficha de la tienda.

## Estructura

- `index.html` — landing del estudio
- `privacy.html` / `terms.html` / `delete-account.html` — legales heredados (ver arriba)
