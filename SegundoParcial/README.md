# Segundo Parcial - Programación Web (5IV6)

| Carpeta | Qué es |
| --- | --- |
| `backend-memoria/` | Backend de práctica (datos en memoria, no necesita MySQL). Puerto 3001. |
| `ExpressProyecto/` | Tu backend real: Express + MySQL + bcrypt (talleres, asistencias, usuarios). |
| `MiniProyecto/primerproyecto/primerproyecto/` | Frontend Next.js que consume el backend (talleres, detalle, inscripción, perfil). |

## Cómo correrlo

**Frontend + backend de práctica** (tarea "Creación del frontend"), en dos terminales:

    cd backend-memoria
    npm install
    npm start                # "Servidor escuchando en el puerto 3001"

    cd MiniProyecto/primerproyecto/primerproyecto
    npm install
    npm run dev              # http://localhost:3000/talleres

**Backend real con MySQL** (tareas "Backend" y "Pruebas con Postman"):

1. Corre `ExpressProyecto/schema.sql` en MySQL Workbench.
2. Copia `.env.example` como `.env` y pon tu contraseña de MySQL.
3. `cd ExpressProyecto && npm install && npm start`
4. Prueba las 24 peticiones de la guía de Postman contra http://localhost:3001

> Los dos backends usan el puerto 3001: enciende solo uno a la vez.

## Subirlo a un GitHub nuevo

    git init
    git add .
    git commit -m "Segundo parcial: backend y frontend de talleres"
    git branch -M main
    git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
    git push -u origin main

## Datos de ejemplo (backend-memoria)

Boletas para probar: 2026090001 (Ana), 2026090002 (Luis), 2026090003 (María),
2026999999 (inscrito sin cuenta), 0000000000 (admin).
