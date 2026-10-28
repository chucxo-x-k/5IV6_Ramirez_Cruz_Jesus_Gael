const Taller = require('../models/talleres.model');
const Asistencia = require('../models/asistencias.model');

exports.listar = (req, res) => res.json(Taller.listar());

exports.obtener = (req, res) => {
  const taller = Taller.obtener(req.params.id);
  if (!taller) return res.status(404).json({ error: 'Taller no encontrado' });
  res.json(taller);
};

exports.crear = (req, res) => {
  const { nombre, instructor, fecha, cupo } = req.body || {};
  if (!nombre || !fecha) return res.status(400).json({ error: 'nombre y fecha son obligatorios' });
  res.status(201).json(Taller.crear({ nombre, instructor, fecha, cupo }));
};

exports.asistencias = (req, res) => res.json(Asistencia.listarPorTaller(req.params.id));
