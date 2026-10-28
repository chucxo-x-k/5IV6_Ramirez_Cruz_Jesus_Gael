const bcrypt = require('bcryptjs');
const db = require('../datos/memoria');

// Nunca se devuelve la contraseña, ni siquiera cifrada.
const publico = ({ contrasena_hash, ...resto }) => resto;

const listar = () => db.usuarios.map(publico);

function obtener(id) {
  const u = db.usuarios.find((x) => x.id === Number(id));
  return u ? publico(u) : null;
}

function existeCorreoOBoleta(correo, boleta) {
  return db.usuarios.some((u) => u.correo === correo || u.boleta === boleta);
}

function existeCorreo(correo, exceptoId) {
  return db.usuarios.some((u) => u.correo === correo && u.id !== Number(exceptoId));
}

function crear({ nombre, correo, contrasena, boleta }) {
  const nuevo = {
    id: db.siguienteUsuarioId++,
    nombre,
    correo,
    contrasena_hash: bcrypt.hashSync(contrasena, 8),
    boleta,
    rol: 'alumno',
  };
  db.usuarios.push(nuevo);
  return publico(nuevo);
}

// Solo cambia los campos que vienen en `cambios`.
function actualizar(id, cambios) {
  const u = db.usuarios.find((x) => x.id === Number(id));
  if (!u) return null;
  for (const campo of ['nombre', 'correo', 'rol']) {
    if (cambios[campo] !== undefined) u[campo] = cambios[campo];
  }
  return publico(u);
}

function eliminar(id) {
  const i = db.usuarios.findIndex((x) => x.id === Number(id));
  if (i === -1) return false;
  db.usuarios.splice(i, 1);
  return true;
}

module.exports = { listar, obtener, existeCorreoOBoleta, existeCorreo, crear, actualizar, eliminar };
