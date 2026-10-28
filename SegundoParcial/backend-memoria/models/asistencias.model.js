const crypto = require('crypto');
const db = require('../datos/memoria');

function listarPorTaller(tallerId) {
  return db.asistencias.filter((a) => a.taller_id === tallerId);
}

function crear({ taller_id, nombre_alumno, boleta }) {
  // Igual que la llave foránea de MySQL: si el taller no existe, falla (el controlador responde 500).
  if (!db.talleres.some((t) => t.id === taller_id)) {
    throw new Error('FOREIGN KEY: el taller no existe');
  }
  const nueva = {
    id: crypto.randomUUID(),
    taller_id,
    nombre_alumno,
    boleta,
    fecha_registro: new Date().toISOString(),
  };
  db.asistencias.push(nueva);
  return nueva;
}

module.exports = { listarPorTaller, crear };
