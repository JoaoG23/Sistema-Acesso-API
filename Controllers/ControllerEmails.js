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


    enviarEmail:async function () {

        
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
            to:email,
            subject:`Boas Vinda! ${login} ao Sistema João Acesso`,
            html:`
            <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email</title>
</head>
<body>
<main>
    <h1>Olá, ${login} meu caro</h1>
    <h2>Tudo bem?! </h2>
    <h4>Você foi cadastrado no Sistema de Segurança e Controle de Acessos João Acesso </h4><h5>Aqui abaixo terá algumas informações sigilosas do acesso ao sistema tome cuidado</h5>
    <b>Seu usuário é : </b>${login}
    <b>Sua senha  é : </b>${senha}
</main>
<section>
    <p>Guarde ela bem guardada!</p>
    <b><i>A equipe do Sistema João Acesso agradeçe !</i></b>
    <p>Atenciosamente</p>
    <div>
        <img width=120 height=120 src='https://raw.githubusercontent.com/JoaoG23/Joao-Acesso/main/Documents/Assets/logo.png'>
    </div>
</section>
</body>
</html> `

        }).then(info => {console.info(info)}).catch(erro => {console.error(erro)});

    }
}

module.exports = configEmails;