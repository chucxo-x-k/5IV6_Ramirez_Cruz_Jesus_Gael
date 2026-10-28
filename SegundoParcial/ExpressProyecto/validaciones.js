const validarCorreo = (c) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c);
const validarBoleta = (b) => /^\d{10}$/.test(b);
const validarContrasena = (p) => typeof p === 'string' && p.length >= 8;
const ROLES = ['alumno', 'docente', 'admin'];

module.exports = { validarCorreo, validarBoleta, validarContrasena, ROLES };
