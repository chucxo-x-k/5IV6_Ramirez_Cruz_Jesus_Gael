const Taller = require('../Modelo/talleres');
const Asistencia = require('../Modelo/asistencias');

exports.listar = async (req, res) => {
  try {
    res.json(await Taller.listar());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar los talleres' });
  }
};

exports.obtener = async (req, res) => {
  try {
    const taller = await Taller.obtener(req.params.id);
    if (!taller) return res.status(404).json({ error: 'Taller no encontrado' });
    res.json(taller);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el taller' });
  }
};

exports.crear = async (req, res) => {
  const { nombre, instructor, fecha, cupo } = req.body || {};
  if (!nombre || !fecha) return res.status(400).json({ error: 'nombre y fecha son obligatorios' });
  try {
    res.status(201).json(await Taller.crear({ nombre, instructor, fecha, cupo }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el taller' });
  }
};

exports.asistencias = async (req, res) => {
  try {
    res.json(await Asistencia.listarPorTaller(req.params.id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar las asistencias' });
  }
};
