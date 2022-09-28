require('dotenv').config()
// ---- Inicializado conexaoes -----
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const allRouters = require('./Routers/routers');

app.use(cors());
app.use("/api", allRouters );

let porta = process.env.PORTA_SERVIDOR || 3000;

app.listen( porta, () =>{
    console.log("API Sistema Joao Acesso Rodando na porta: ", porta );
});