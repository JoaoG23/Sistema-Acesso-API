const nodeMailer = require('nodemailer');
const gerarTemplateEmail = require('./TemplateMsgEmail');
const pool = require('../Model/ConnectioDB');
const emailsController = {

    buscarConfigsTestAPI: async function ( request, response ) { 
        try {
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
    },


    enviarEmail:async function ( emailDestino,senha,login ) {

        const loginUsuario = login;
        const senhaUsuario = senha;
        
        const buscarConfigsEmail = 'SELECT PROCEDURE_EMAIL_BUSCA()';

        const resultadoEmailAchado = await pool.query( buscarConfigsEmail );
        const resultBusca = resultadoEmailAchado.rows[0].procedure_email_busca;

        const user = resultBusca.usuario_email;
        const pass = resultBusca.senha_email;

        const transporter = nodeMailer.createTransport({
            host:resultBusca.host_email,
            port:resultBusca.port_email,
            auth:{ user, pass }
        })


        transporter.sendMail({
            from:user,
            to:emailDestino,
            subject:gerarTemplateEmail(loginUsuario,senhaUsuario)[0],
            html:gerarTemplateEmail(loginUsuario,senhaUsuario)[1]

        }).then(info => {console.info(info)}).catch(erro => {console.error(erro)});

    }
}

module.exports = emailsController;