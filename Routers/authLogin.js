const express = require('express');
const router = express.Router(); 
const gestoresController = require('../Controllers/ControllerGestoresSistema');

router.post("/logar", express.json() , gestoresController.login );
router.post("/registrar", express.json() , gestoresController.registrarUser );

module.exports = router;