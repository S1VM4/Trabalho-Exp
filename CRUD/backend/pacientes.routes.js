const express = require('express');
const router = express.Router();
const controller = require('./pacientes.controller');

router.get('/pacientes', controller.getAll);
router.get('/pacientes/:id', controller.getById);
router.post('/pacientes', controller.create);
router.put('/pacientes/:id', controller.update);
router.delete('/pacientes/:id', controller.delete);

module.exports = router;
