const Usuario = require('../Modelo/usuarios');
const { validarCorreo, validarBoleta, validarContrasena, ROLES } = require('../validaciones');

exports.listar = async (req, res) => {
  try {
    res.json(await Usuario.listar());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar los usuarios' });
  }
};

exports.obtener = async (req, res) => {
  try {
    const u = await Usuario.obtener(req.params.id);
    if (!u) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(u);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

exports.crear = async (req, res) => {
  const { nombre, correo, contrasena, boleta } = req.body || {};
  if (!nombre || !correo || !contrasena || !boleta) {
    return res.status(400).json({ error: 'nombre, correo, contrasena y boleta son obligatorios' });
  }
  if (!validarCorreo(correo)) return res.status(400).json({ error: 'El correo no tiene un formato válido' });
  if (!validarBoleta(String(boleta))) return res.status(400).json({ error: 'La boleta debe tener 10 dígitos' });
  if (!validarContrasena(contrasena)) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
  }
  try {
    res.status(201).json(await Usuario.crear({ nombre, correo, contrasena, boleta: String(boleta) }));
  } catch (err) {
    // El UNIQUE de la tabla ya impide el duplicado; aquí se convierte el error en un 409 claro.
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Ya existe un usuario con ese correo o boleta' });
    }
    console.error(err);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

exports.actualizar = async (req, res) => {
  const { nombre, correo, rol } = req.body || {};
  if (nombre === undefined && correo === undefined && rol === undefined) {
    return res.status(400).json({ error: 'Envía al menos uno de: nombre, correo, rol' });
  }
  if (correo !== undefined && !validarCorreo(correo)) {
    return res.status(400).json({ error: 'El correo no tiene un formato válido' });
  }
  if (rol !== undefined && !ROLES.includes(rol)) {
    return res.status(400).json({ error: 'El rol debe ser alumno, docente o admin' });
  }
  try {
    if (!(await Usuario.obtener(req.params.id))) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(await Usuario.actualizar(req.params.id, { nombre, correo, rol }));
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Ya existe un usuario con ese correo' });
    }
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

exports.eliminar = async (req, res) => {
  try {
    if (!(await Usuario.eliminar(req.params.id))) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
