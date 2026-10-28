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

-- Datos de ejemplo
INSERT IGNORE INTO talleres (id, nombre, instructor, fecha, cupo) VALUES
 ('a1000000-0000-4000-8000-000000000001', 'Introducción a Python', 'Ing. Carlos Ruiz', '2026-10-26', 20),
 ('a1000000-0000-4000-8000-000000000004', 'Git y GitHub en equipo', 'Ing. Diego Salas', '2026-11-16', 3);
