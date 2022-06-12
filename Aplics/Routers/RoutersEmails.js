const express = require('express');
const router = express.Router(); 
const emailsController = require('../Controllers/ControllerEmails');

router.get("/", emailsController.buscarConfigsTestAPI );
router.put("/", express.json(), emailsController.atualizarEmail );

module.exports = router;