// "Base de datos" en memoria. Cada vez que se reinicia el servidor vuelven los datos de ejemplo.
const bcrypt = require('bcryptjs');

const idTaller = (n) => `a1000000-0000-4000-8000-${String(n).padStart(12, '0')}`;
const idAsistencia = (n) => `b2000000-0000-4000-8000-${String(n).padStart(12, '0')}`;
const hash = bcrypt.hashSync('Segura2026', 8);

const db = {
  talleres: [
    { id: idTaller(1), nombre: 'Introducción a Python', instructor: 'Ing. Carlos Ruiz', fecha: '2026-10-26', cupo: 20 },
    { id: idTaller(2), nombre: 'Fundamentos de Redes', instructor: 'Mtra. Laura Gómez', fecha: '2026-11-02', cupo: 15 },
    { id: idTaller(3), nombre: 'Diseño de Bases de Datos', instructor: 'Ing. Ana Torres', fecha: '2026-11-09', cupo: 25 },
    { id: idTaller(4), nombre: 'Git y GitHub en equipo', instructor: 'Ing. Diego Salas', fecha: '2026-11-16', cupo: 3 },
    { id: idTaller(5), nombre: 'Next.js desde cero', instructor: null, fecha: '2026-11-23', cupo: 2 },
  ],
  asistencias: [
    { id: idAsistencia(1), taller_id: idTaller(1), nombre_alumno: 'Ana López', boleta: '2026090001', fecha_registro: '2026-10-19T10:00:00.000Z' },
    { id: idAsistencia(2), taller_id: idTaller(1), nombre_alumno: 'Alumno sin cuenta', boleta: '2026999999', fecha_registro: '2026-10-19T10:05:00.000Z' },
    { id: idAsistencia(3), taller_id: idTaller(4), nombre_alumno: 'Ana López', boleta: '2026090001', fecha_registro: '2026-10-19T11:00:00.000Z' },
    { id: idAsistencia(4), taller_id: idTaller(4), nombre_alumno: 'Luis Pérez', boleta: '2026090002', fecha_registro: '2026-10-19T11:10:00.000Z' },
    { id: idAsistencia(5), taller_id: idTaller(5), nombre_alumno: 'Luis Pérez', boleta: '2026090002', fecha_registro: '2026-10-19T12:00:00.000Z' },
    { id: idAsistencia(6), taller_id: idTaller(5), nombre_alumno: 'María Hernández', boleta: '2026090003', fecha_registro: '2026-10-19T12:10:00.000Z' },
  ],
  usuarios: [
    { id: 1, nombre: 'Admin Semilla', correo: 'admin@cecyt9.ipn.mx', contrasena_hash: hash, boleta: '0000000000', rol: 'admin' },
    { id: 2, nombre: 'Ana López', correo: 'ana.lopez@alumno.ipn.mx', contrasena_hash: hash, boleta: '2026090001', rol: 'alumno' },
    { id: 3, nombre: 'Luis Pérez', correo: 'luis.perez@alumno.ipn.mx', contrasena_hash: hash, boleta: '2026090002', rol: 'alumno' },
    { id: 4, nombre: 'María Hernández', correo: 'maria.hernandez@alumno.ipn.mx', contrasena_hash: hash, boleta: '2026090003', rol: 'alumno' },
  ],
  siguienteUsuarioId: 5,
};

module.exports = db;
