const express = require('express');
const router = express.Router(); 
const auth = require('./auth/ValidateRouters');

const routersUsuarios = require('./RoutersUsuarios');
const routerEmails = require('./RoutersEmails');
const routerRelatorios = require('./RoutersRelatorios');
const routerAcessos = require('./RoutersAcessos');
const routerGestores = require('./authLogin');
const routerLogin = require('./authLogin');

router.use("/usuario", auth ,routersUsuarios);
router.use("/email", auth ,routerEmails);
router.use("/relatorios", auth , routerRelatorios);
router.use("/acessos", auth ,routerAcessos);
router.use("/auth",auth, routerGestores);
router.use("/init", routerLogin);

module.exports = router;