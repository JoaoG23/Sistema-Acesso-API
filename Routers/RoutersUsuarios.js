const express = require('express');
const router = express.Router(); 
const controllerUsuarios = require('../Controllers/ControllerUsuarios');


router.get("/lista", controllerUsuarios.listaTodosUsuarios );
router.get("/listapagina/:numero_pagina", controllerUsuarios.listarUsuariosPaginar );

router.get("/lista/:id_usuario", controllerUsuarios.listaUsuarioPeloID );
router.get("/listaNome/:nome_usuario", controllerUsuarios.listaUsuarioNome );
router.get("/afastamento/listar/:id_afastamento", controllerUsuarios.listaAfastamentosID );
router.get("/afastamento/listar", controllerUsuarios.listaTiposAfastamentos );

router.post("/inserir", express.json(),controllerUsuarios.adicionarUsuarioECrendencial);
router.post("/afastamento/inserir", express.json() ,controllerUsuarios.addAfastamento );
router.post( "/teste", express.json(), controllerUsuarios.rotaTestePosts );

router.delete( "/remover", express.json(), controllerUsuarios.deletarUsuarioECrendecial );
router.delete( "/afastamento/remover", express.json(), controllerUsuarios.DeletarAfastamento );

router.put( "/edit", express.json(), controllerUsuarios.atualizarUsuario );

router.put("/afastamento/atualizar", express.json() ,controllerUsuarios.atualizarAfastamento );


module.exports = router;