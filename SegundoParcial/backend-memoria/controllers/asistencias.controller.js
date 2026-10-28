const Asistencia = require('../models/asistencias.model');

exports.crear = (req, res) => {
  const { taller_id, nombre_alumno, boleta } = req.body || {};
  if (!taller_id || !nombre_alumno || !boleta) {
    return res.status(400).json({ error: 'taller_id, nombre_alumno y boleta son obligatorios' });
  }
  try {
    res.status(201).json(Asistencia.crear({ taller_id, nombre_alumno, boleta }));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error del servidor al registrar la asistencia' });
  }
};
