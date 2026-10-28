const bcrypt = require('bcryptjs');
const pool = require('../db-local');

// Solo columnas públicas: nunca se hace SELECT * (saldría contrasena_hash).
const COLUMNAS = 'id, nombre, correo, boleta, rol';

async function listar() {
  const [filas] = await pool.query(`SELECT ${COLUMNAS} FROM usuarios ORDER BY id`);
  return filas;
}

async function obtener(id) {
  const [filas] = await pool.query(`SELECT ${COLUMNAS} FROM usuarios WHERE id = ?`, [id]);
  return filas[0] || null;
}

async function crear({ nombre, correo, contrasena, boleta }) {
  const hash = await bcrypt.hash(contrasena, 10);
  const [r] = await pool.query(
    'INSERT INTO usuarios (nombre, correo, contrasena_hash, boleta) VALUES (?, ?, ?, ?)',
    [nombre, correo, hash, boleta]
  );
  return obtener(r.insertId);
}

// Solo actualiza las columnas que vienen en `cambios` (el resto no se toca).
async function actualizar(id, cambios) {
  const campos = [];
  const valores = [];
  for (const campo of ['nombre', 'correo', 'rol']) {
    if (cambios[campo] !== undefined) {
      campos.push(`${campo} = ?`);
      valores.push(cambios[campo]);
    }
  }
  await pool.query(`UPDATE usuarios SET ${campos.join(', ')} WHERE id = ?`, [...valores, id]);
  return obtener(id);
}

async function eliminar(id) {
  const [r] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
  return r.affectedRows > 0;
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
