const express = require('express');
const router = express.Router(); 
const controllerAcessos = require('../Controllers/ControllerAcessos');

router.get("/", controllerAcessos.listaTodosAcessos );
router.get("/ultimo", controllerAcessos.ultimoAcesso );
router.get("/busca30DiasCriterio", controllerAcessos.buscaDados30DiasPorCriterio );
router.get("/contar4meses", controllerAcessos.busca4meses );
router.get("/contar30Dias", controllerAcessos.contarTodos30Dias );
router.get("/contaQuantoHoje", controllerAcessos.contaTodosAcessoHoje );

router.get("/buscacredencial/:credencial", controllerAcessos.listaAcessoPelaCredencial );
router.get("/buscacredencialdatas", controllerAcessos.listaAcessoPelaData );
router.post("/checkin", express.json() , controllerAcessos.checkinDeControleAcesso );

module.exports = router;