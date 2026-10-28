const router = require('express').Router();
const c = require('../controllers/asistencias.controller');

router.post('/', c.crear);

module.exports = router;
