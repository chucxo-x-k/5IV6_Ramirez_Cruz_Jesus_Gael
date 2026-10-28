const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

// new Date('2026-10-26') se interpreta como medianoche UTC, que en México (UTC-6) es el 25 a las 6 pm.
// Por eso aquí se arma la fecha con año, mes y día locales, sin pasar por UTC.
function aFechaLocal(texto) {
  const [anio, mes, dia] = String(texto).slice(0, 10).split('-').map(Number);
  return new Date(anio, mes - 1, dia);
}

export function formatearFecha(texto) {
  const f = aFechaLocal(texto);
  return `${DIAS[f.getDay()]}, ${f.getDate()} de ${MESES[f.getMonth()]} de ${f.getFullYear()}`;
}

export function yaPaso(texto) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return aFechaLocal(texto) < hoy;
}

// La boleta es un dato personal: 2026090001 -> ******0001
export function ocultarBoleta(boleta) {
  return `******${String(boleta).slice(-4)}`;
}
