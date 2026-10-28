const Asistencia = require('../Modelo/asistencias');

exports.crear = async (req, res) => {
  const { taller_id, nombre_alumno, boleta } = req.body || {};
  if (!taller_id || !nombre_alumno || !boleta) {
    return res.status(400).json({ error: 'taller_id, nombre_alumno y boleta son obligatorios' });
  }
  try {
    res.status(201).json(await Asistencia.crear({ taller_id, nombre_alumno, boleta }));
  } catch (err) {
    console.error(err.code, err.message);
    // Observación para el reporte (Postman 4.4): un taller inexistente rompe la llave foránea y sale 500,
    // aunque lo más correcto sería 404. Para mejorarlo: if (err.code === 'ER_NO_REFERENCED_ROW_2') responder 404.
    res.status(500).json({ error: 'Error al registrar la asistencia' });
  }
};
