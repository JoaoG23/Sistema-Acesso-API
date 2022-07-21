require('dotenv').config()
// ---- Inicializado conexaoes -----
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors());
const routerEmails = require('./Routers/RoutersEmails')
const routersUsuarios = require('./Routers/RoutersUsuarios');
const routerAcessos = require('./Routers/RoutersAcessos');
const routerGestores = require('./Routers/RoutersLogins');
const routerRelatorios = require('./Routers/RoutersRelatorios');
const routerLogin = require('./Routers/authLogin');
const auth = require('./Routers/ValidateRouters');


app.use("/usuario", auth ,routersUsuarios);
app.use("/email", auth ,routerEmails);
app.use("/relatorios", auth , routerRelatorios);
app.use("/acessos", auth ,routerAcessos);
app.use("/auth",auth, routerGestores);
app.use("/init", routerLogin);
app.use('/', express.static(path.join(__dirname, "Views/Tela-sem-react")));


let porta = process.env.PORT_SERVIDOR;

app.listen( porta || 3000, () =>{
    console.log("API Sistema Joao Acesso Rodando na porta: ", porta );
});