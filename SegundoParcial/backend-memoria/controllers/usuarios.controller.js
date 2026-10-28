const Usuario = require('../models/usuarios.model');
const { validarCorreo, validarBoleta, validarContrasena, ROLES } = require('../validaciones');

exports.listar = (req, res) => res.json(Usuario.listar());

exports.obtener = (req, res) => {
  const u = Usuario.obtener(req.params.id);
  if (!u) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(u);
};

exports.crear = (req, res) => {
  const { nombre, correo, contrasena, boleta } = req.body || {};
  if (!nombre || !correo || !contrasena || !boleta) {
    return res.status(400).json({ error: 'nombre, correo, contrasena y boleta son obligatorios' });
  }
  if (!validarCorreo(correo)) return res.status(400).json({ error: 'El correo no tiene un formato válido' });
  if (!validarBoleta(String(boleta))) return res.status(400).json({ error: 'La boleta debe tener 10 dígitos' });
  if (!validarContrasena(contrasena)) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
  }
  if (Usuario.existeCorreoOBoleta(correo, String(boleta))) {
    return res.status(409).json({ error: 'Ya existe un usuario con ese correo o boleta' });
  }
  res.status(201).json(Usuario.crear({ nombre, correo, contrasena, boleta: String(boleta) }));
};

exports.actualizar = (req, res) => {
  const { nombre, correo, rol } = req.body || {};
  if (nombre === undefined && correo === undefined && rol === undefined) {
    return res.status(400).json({ error: 'Envía al menos uno de: nombre, correo, rol' });
  }
  if (!Usuario.obtener(req.params.id)) return res.status(404).json({ error: 'Usuario no encontrado' });
  if (correo !== undefined && !validarCorreo(correo)) {
    return res.status(400).json({ error: 'El correo no tiene un formato válido' });
  }
  if (rol !== undefined && !ROLES.includes(rol)) {
    return res.status(400).json({ error: 'El rol debe ser alumno, docente o admin' });
  }
  if (correo !== undefined && Usuario.existeCorreo(correo, req.params.id)) {
    return res.status(409).json({ error: 'Ya existe un usuario con ese correo' });
  }
  res.json(Usuario.actualizar(req.params.id, { nombre, correo, rol }));
};

exports.eliminar = (req, res) => {
  if (!Usuario.eliminar(req.params.id)) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.status(204).send();
};
