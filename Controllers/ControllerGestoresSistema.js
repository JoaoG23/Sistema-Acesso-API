const bcrypt = require('bcryptjs');
const pool = require('../Model/ConnectioDB');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');

const gestoresController = {

    buscaRegistrados: async function ( request, response ) { // Lembre se do Async!
        
        try {
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
            const ProcedureRegistrar = 'SELECT procedure_registrar_gestor($1,$2,$3)';
            const criptoSenha = bcrypt.hashSync(senha); // Encriptar senha antes de chegar ao banco
            const values = [login, criptoSenha , email];
            
            const resultado = await pool.query( ProcedureRegistrar, values );
            const respostaAdicionado = resultado.rows[0].procedure_registrar_gestor;

            // const buscarConfigsEmail = 'SELECT PROCEDURE_EMAIL_BUSCA()';

            // const resultadoEmailAchado = await pool.query( buscarConfigsEmail );
            // const resultBusca = resultadoEmailAchado.rows[0].procedure_email_busca;

            // const user = resultBusca.usuario_email;
            // const pass = resultBusca.senha_email;



   
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