const express = require('express');
const router = express.Router(); 
const controllerRelatorios = require('../Controllers/ControllerRelatorios');

router.get("/", controllerRelatorios.listaRelatorios );
router.get("/periodo", controllerRelatorios.listaDadosCredencialeData );

module.exports = router;