
const jwt = require('jsonwebtoken');

module.exports = function (request, response, next){

    const token = request.header('authorization-token'); // Pegar a dados do cabecalho
    if(!token) return response.status(401).json('Sua navegacão e proibida');

    try {
        
        const verificaToken = jwt.verify(token , process.env.TOKEN_SECRET);// Verifica se e correto com o segredo e libera a rota
        request.usuario = verificaToken;
        next();

    } catch (error) {
        response.status(401).json({open:false , msg:"voce ainda não logou no sistema! Por favor entre na rota logar!?"});
    }
}