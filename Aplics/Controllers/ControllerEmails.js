const pool = require('../Model/ConnectioDB');
const configEmails = {

    buscarConfigsTestAPI: async function ( request, response ) { 
        try {
            // await pool.connect();
            const procedure = 'SELECT PROCEDURE_EMAIL_BUSCA()';
            
            const resultado = await pool.query( procedure );
            const resultBusca = resultado.rows[0].procedure_email_busca;
            response.json(resultBusca);
            
        } catch (erro) {
            response.status(404).json(erro);
            console.error(erro);
        }
    },

    atualizarEmail: async function ( request, response ) { 
        try {
            // await pool.connect();
            const procedure = 'SELECT procedure_email_atualizar_dados($1,$2,$3,$4,$5)';
            const host = request.body.host_email;
            const port = request.body.port_email;
            const userEmail = request.body.usuario_email;
            const senha = request.body.senha_email;
            const tsl_ssl = request.body.config_ssl_tls;
            
            let values = [ host ,port, userEmail, senha, tsl_ssl ];
            
            const resultado = await pool.query( procedure , values );
            const resultBusca = resultado.rows[0].procedure_email_atualizar_dados;
            response.json(resultBusca);
            
        } catch (erro) {
            response.status(404).json(erro);
            console.error(erro);
        }
    }
}

module.exports = configEmails;