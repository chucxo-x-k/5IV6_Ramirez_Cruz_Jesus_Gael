const crypto = require('crypto');
const pool = require('../db-local');

async function listar() {
  const [filas] = await pool.query('SELECT id, nombre, instructor, fecha, cupo FROM talleres ORDER BY fecha');
  return filas;
}

async function obtener(id) {
  const [filas] = await pool.query(
    `SELECT t.id, t.nombre, t.instructor, t.fecha, t.cupo, COUNT(a.id) AS asistentes
       FROM talleres t LEFT JOIN asistencias a ON a.taller_id = t.id
      WHERE t.id = ? GROUP BY t.id`,
    [id]
  );
  return filas[0] || null;
}

async function crear({ nombre, instructor, fecha, cupo }) {
  const id = crypto.randomUUID();
  await pool.query('INSERT INTO talleres (id, nombre, instructor, fecha, cupo) VALUES (?, ?, ?, ?, ?)', [
    id,
    nombre,
    instructor || null,
    fecha,
    cupo ? Number(cupo) : 30,
  ]);
  const [filas] = await pool.query('SELECT id, nombre, instructor, fecha, cupo FROM talleres WHERE id = ?', [id]);
  return filas[0];
}

module.exports = { listar, obtener, crear };
