const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Registro de Asistencia - CECyT 9 funcionando correctamente' });
});

app.use('/api/talleres', require('./routes/talleres.routes'));
app.use('/api/asistencias', require('./routes/asistencias.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));

// Ruta que no existe -> 404 en JSON
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

// JSON mal escrito en el body -> 400 (en vez de una página HTML de error)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'El JSON del body no es válido' });
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT} (BD: memoria; los datos se reinician al apagarlo)`);
});
