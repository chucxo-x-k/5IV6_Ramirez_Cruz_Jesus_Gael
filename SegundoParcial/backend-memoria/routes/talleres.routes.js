const router = require('express').Router();
const c = require('../controllers/talleres.controller');

router.get('/', c.listar);
router.post('/', c.crear);
router.get('/:id/asistencias', c.asistencias);
router.get('/:id', c.obtener);

module.exports = router;
