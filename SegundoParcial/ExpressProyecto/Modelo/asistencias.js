const crypto = require('crypto');
const pool = require('../db-local');

async function listarPorTaller(tallerId) {
  const [filas] = await pool.query(
    'SELECT id, taller_id, nombre_alumno, boleta, fecha_registro FROM asistencias WHERE taller_id = ? ORDER BY fecha_registro',
    [tallerId]
  );
  return filas;
}

// Si el taller no existe, MySQL rechaza el INSERT por la llave foránea y el controlador responde 500.
async function crear({ taller_id, nombre_alumno, boleta }) {
  const id = crypto.randomUUID();
  await pool.query('INSERT INTO asistencias (id, taller_id, nombre_alumno, boleta) VALUES (?, ?, ?, ?)', [
    id,
    taller_id,
    nombre_alumno,
    boleta,
  ]);
  const [filas] = await pool.query(
    'SELECT id, taller_id, nombre_alumno, boleta, fecha_registro FROM asistencias WHERE id = ?',
    [id]
  );
  return filas[0];
}

module.exports = { listarPorTaller, crear };
