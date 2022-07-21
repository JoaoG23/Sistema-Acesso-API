const express = require('express');
const router = express.Router(); 
const gestoresController = require('../Controllers/ControllerGestoresSistema');


router.get("/listar", gestoresController.buscaRegistrados );
router.get("/listar/:idgestor", gestoresController.buscaGestorId );
router.get("/listarLogin/:login_nome", gestoresController.buscaGestorLoginNome );

router.post("/registrar", express.json() , gestoresController.registrarUser );
router.delete("/deletar", express.json() , gestoresController.deleteGestor );


module.exports = router;