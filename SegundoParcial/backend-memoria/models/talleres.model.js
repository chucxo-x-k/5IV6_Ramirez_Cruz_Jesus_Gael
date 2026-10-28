const crypto = require('crypto');
const db = require('../datos/memoria');

function listar() {
  return db.talleres;
}

function obtener(id) {
  const taller = db.talleres.find((t) => t.id === id);
  if (!taller) return null;
  const asistentes = db.asistencias.filter((a) => a.taller_id === id).length;
  return { ...taller, asistentes };
}

function crear({ nombre, instructor, fecha, cupo }) {
  const nuevo = {
    id: crypto.randomUUID(),
    nombre,
    instructor: instructor || null,
    fecha,
    cupo: cupo ? Number(cupo) : 30,
  };
  db.talleres.push(nuevo);
  return nuevo;
}

module.exports = { listar, obtener, crear };
