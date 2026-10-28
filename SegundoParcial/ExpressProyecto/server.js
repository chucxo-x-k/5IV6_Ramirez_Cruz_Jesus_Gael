require('dotenv').config();
const express = require('express');
const cors = require('cors');

const talleres = require('./Controlador/talleres_controlador');
const asistencias = require('./Controlador/asistencias_controlador');
const usuarios = require('./Controlador/usuarios-controlador');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Prueba de vida
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Registro de Asistencia - CECyT 9 funcionando correctamente' });
});

// Talleres
app.get('/api/talleres', talleres.listar);
app.post('/api/talleres', talleres.crear);
app.get('/api/talleres/:id/asistencias', talleres.asistencias);
app.get('/api/talleres/:id', talleres.obtener);

// Asistencias
app.post('/api/asistencias', asistencias.crear);

// Usuarios (CRUD)
app.get('/api/usuarios', usuarios.listar);
app.post('/api/usuarios', usuarios.crear);
app.get('/api/usuarios/:id', usuarios.obtener);
app.put('/api/usuarios/:id', usuarios.actualizar);
app.delete('/api/usuarios/:id', usuarios.eliminar);

app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'El JSON del body no es válido' });
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
