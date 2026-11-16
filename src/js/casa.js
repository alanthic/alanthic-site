// La casa toma el color del cuarto que tienes en pantalla, y el menú marca la sección.
// El sitio funciona completo sin este archivo.
const raiz = document.documentElement.style;
// En las páginas de app el menú ya marca Trabajos desde la plantilla.
const enlaces = document.getElementById('trabajos') ? document.querySelectorAll('.cuartos a') : [];
const cuartos = ['pazo', 'collecty', 'kittsu', 'sticker', 'kintal'];
const seccionDe = (id) => (cuartos.includes(id) ? 'trabajos' : id);
const io = new IntersectionObserver((entradas) => {
  for (const e of entradas) {
    if (!e.isIntersecting) continue;
    const d = e.target.dataset;
    raiz.setProperty('--bg', d.bg);
    raiz.setProperty('--fg', d.fg || '#1A1B19');
    raiz.setProperty('--fg-2', d.fg2 || '#5B5D58');
    raiz.setProperty('--acento', d.acento || '#0F4C4A');
    enlaces.forEach((a) => a.setAttribute('aria-current', String(a.hash === '#' + seccionDe(e.target.id))));
  }
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('[data-bg]').forEach((s) => io.observe(s));

// Copiar el correo, con confirmación en el mismo botón. Sin portapapeles, el botón no aparece.
const copiar = document.querySelector('.copiar');
if (copiar && navigator.clipboard) {
  copiar.hidden = false;
  copiar.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(copiar.dataset.correo); } catch { return; }
    const antes = copiar.textContent;
    copiar.textContent = copiar.dataset.hecho;
    setTimeout(() => (copiar.textContent = antes), 1600);
  });
}