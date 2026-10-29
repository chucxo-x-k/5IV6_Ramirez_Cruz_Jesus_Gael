-- Corre este archivo completo en MySQL Workbench (o: mysql -u root -p < schema.sql)
CREATE DATABASE IF NOT EXISTS asistencia_cecyt9 CHARACTER SET utf8mb4;
USE asistencia_cecyt9;

CREATE TABLE IF NOT EXISTS talleres (
  id         CHAR(36)     PRIMARY KEY,
  nombre     VARCHAR(120) NOT NULL,
  instructor VARCHAR(120) NULL,
  fecha      DATE         NOT NULL,
  cupo       INT          NOT NULL DEFAULT 30
);

CREATE TABLE IF NOT EXISTS asistencias (
  id             CHAR(36)     PRIMARY KEY,
  taller_id      CHAR(36)     NOT NULL,
  nombre_alumno  VARCHAR(120) NOT NULL,
  boleta         CHAR(10)     NOT NULL,
  fecha_registro TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (taller_id) REFERENCES talleres(id)
);

CREATE TABLE IF NOT EXISTS usuarios (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  nombre          VARCHAR(120) NOT NULL,
  correo          VARCHAR(150) NOT NULL UNIQUE,
  contrasena_hash VARCHAR(100) NOT NULL,
  boleta          CHAR(10)     NOT NULL UNIQUE,
  rol             ENUM('alumno','docente','admin') NOT NULL DEFAULT 'alumno'
);

-- Datos de ejemplo (los mismos del backend-memoria)
INSERT IGNORE INTO talleres (id, nombre, instructor, fecha, cupo) VALUES
 ('a1000000-0000-4000-8000-000000000001', 'Introducción a Python', 'Ing. Carlos Ruiz', '2026-10-26', 20),
 ('a1000000-0000-4000-8000-000000000002', 'Fundamentos de Redes', 'Mtra. Laura Gómez', '2026-11-02', 15),
 ('a1000000-0000-4000-8000-000000000003', 'Diseño de Bases de Datos', 'Ing. Ana Torres', '2026-11-09', 25),
 ('a1000000-0000-4000-8000-000000000004', 'Git y GitHub en equipo', 'Ing. Diego Salas', '2026-11-16', 3),
 ('a1000000-0000-4000-8000-000000000005', 'Next.js desde cero', NULL, '2026-11-23', 2);

INSERT IGNORE INTO asistencias (id, taller_id, nombre_alumno, boleta) VALUES
 ('b2000000-0000-4000-8000-000000000001', 'a1000000-0000-4000-8000-000000000001', 'Ana López', '2026090001'),
 ('b2000000-0000-4000-8000-000000000002', 'a1000000-0000-4000-8000-000000000001', 'Alumno sin cuenta', '2026999999'),
 ('b2000000-0000-4000-8000-000000000003', 'a1000000-0000-4000-8000-000000000004', 'Ana López', '2026090001'),
 ('b2000000-0000-4000-8000-000000000004', 'a1000000-0000-4000-8000-000000000004', 'Luis Pérez', '2026090002'),
 ('b2000000-0000-4000-8000-000000000005', 'a1000000-0000-4000-8000-000000000005', 'Luis Pérez', '2026090002'),
 ('b2000000-0000-4000-8000-000000000006', 'a1000000-0000-4000-8000-000000000005', 'María Hernández', '2026090003');

-- Usuarios de ejemplo. El hash es de relleno (aún no hay login): sirve para probar el CRUD en Postman,
-- por ejemplo el 409 al actualizar con el correo admin@cecyt9.ipn.mx. Los usuarios que crees con POST sí llevan hash real.
INSERT IGNORE INTO usuarios (nombre, correo, contrasena_hash, boleta, rol) VALUES
 ('Admin Semilla',   'admin@cecyt9.ipn.mx',           '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ012345', '0000000000', 'admin'),
 ('Ana López',       'ana.lopez@alumno.ipn.mx',       '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ012345', '2026090001', 'alumno'),
 ('Luis Pérez',      'luis.perez@alumno.ipn.mx',      '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ012345', '2026090002', 'alumno'),
 ('María Hernández', 'maria.hernandez@alumno.ipn.mx', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ012345', '2026090003', 'alumno');
