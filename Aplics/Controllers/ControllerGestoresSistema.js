const bcrypt = require('bcryptjs');
const pool = require('../Model/ConnectioDB');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');

const gestoresController = {

    buscaRegistrados: async function ( request, response ) { // Lembre se do Async!
        
        try {
            // await pool.connect();
            const ProcedureBuscar = 'SELECT procedure_busca_gestor()';
            const resultado = await pool.query( ProcedureBuscar );
            const resultBusca = resultado.rows[0].procedure_busca_gestor;

                response.json(resultBusca);

        } catch (erro) {
            response.status(404).json(erro);
            console.error(erro);
        }
    },

    buscaGestorId: async function ( request, response ) {
        
        try {

            const id = request.params.idgestor;
            // await pool.connect();
            const ProcedureBuscar = 'SELECT procedure_busca_gestor_pelo_id($1)';
            const values = [id];
            const resultado = await pool.query( ProcedureBuscar , values );
            const resultBusca = resultado.rows[0].procedure_busca_gestor_pelo_id;

                response.json(resultBusca);

        } catch (erro) {
            response.status(404).json(erro);
            console.error(erro);
        }
    },

    buscaGestorLoginNome: async function ( request, response ) {
        
        try {

            const nomeLogin = request.params.login_nome;
            // await pool.connect();
            const ProcedureBuscar = 'SELECT procedure_busca_gestor_login($1)';
            const values = [nomeLogin];
            const resultado = await pool.query( ProcedureBuscar , values );
            const resultBusca = resultado.rows[0].procedure_busca_gestor_login;

                response.json(resultBusca);

        } catch (erro) {
            response.status(404).json(erro);
            console.error(erro);
        }
    },


    deleteGestor: async function ( request, response ) { 

        const id = request.body.idgestor;
        try {
            // await pool.connect();
            const ProcedureDeletar = 'SELECT procedure_deletar_gestor($1)';
            const values = [id];
            
            const resultado = await pool.query( ProcedureDeletar , values );
            const resultBusca = resultado.rows[0].procedure_deletar_gestor;

                response.json(resultBusca);

        } catch (erro) {
            response.status(404).json(erro);
            console.error(erro);
        }
    },


    registrarUser: async function( request, response )  {
        const login = request.body.login;
        const senha = request.body.senha;
        const email = request.body.email;
        
        try {
            // await pool.connect();
            const ProcedureRegistrar = 'SELECT procedure_registrar_gestor($1,$2,$3)';
            const criptoSenha = bcrypt.hashSync(senha); // Encriptar senha antes de chegar ao banco
            const values = [login, criptoSenha , email];
            
            const resultado = await pool.query( ProcedureRegistrar, values );
            const respostaAdicionado = resultado.rows[0].procedure_registrar_gestor;

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

            response.json(respostaAdicionado);
            
        } catch (erro){
            if (erro.code === '23505') {
                response.status(404).json({situacao:false, msg:"Esse registro ja existe no banco de dados, coloque outra por gentileza!"});
            } else {
    
                response.status(404).json(erro);
                console.warn(erro);
            }
    
        }
    },


    login: async function ( request, response ) { 

        const loginName = request.body.login;
        const senha = request.body.senha;
        try {
            // await pool.connect();
            const ProcedureLogin = 'SELECT procedure_valida_login($1)';
            const values  =  [ loginName ];
            
            const resultado = await pool.query( ProcedureLogin, values );
            const resultLogin = resultado.rows[0].procedure_valida_login;
             const valorComparacao = await bcrypt.compare(senha, resultLogin.senha_gestor);

            if (!valorComparacao) { return response.status(401).json({situacao:false ,msg:"Senha ou usuario incorretos "}); } 

             const token = jwt.sign({ id_gestor:resultLogin.id_gestor , email:resultLogin.email_gestor }, process.env.TOKEN_SECRET, {
                expiresIn: 3000 
              } );
             
                response.header('authorization-token', token);
                response.status(202).json(
                {
                    usuario:resultLogin.login_gestor,
                    situacao:true,
                    msg:'Usuario logado com sucesso',
                    tokenlogado:token
                }
            );

        } catch (erro) {
            response.status(404).json({situacao:false , msg:"Usuario ou senha inexistente com algum erro"});
            console.error(erro);
        }
    }
}

module.exports = gestoresController