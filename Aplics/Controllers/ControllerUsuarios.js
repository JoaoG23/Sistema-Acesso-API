

const pool = require('../Model/ConnectioDB');

const listaTodosUsuarios = async (request, response) => {
    try {
        // await pool.connect();
        const resultado = await pool.query('SELECT procedure_busca_usuario()');

        const ListaTodosRespostaFinal = resultado.rows[0].procedure_busca_usuario;
        response.json(ListaTodosRespostaFinal);

    } catch (erro) {

        response.status(404).json(erro);
        console.warn(erro);

    }
}


const listaUsuarioPeloID = async (request, response) => {
    try {

        // await pool.connect();
        const idBuscadoUser = request.params.id_usuario;

        const procedureListaID = 'SELECT procedure_busca_usuario_pelo_id($1)';
        const values = [idBuscadoUser];

        const resultado = await pool.query(procedureListaID, values);
        const infoUserRespostaFinal = resultado.rows[0].procedure_busca_usuario_pelo_id;
        response.json(infoUserRespostaFinal);

    } catch (erro) {

        response.status(404).json(erro);
        console.error(erro);
    }
}


const listaUsuarioNome = async (request, response) => {
    try {

        // await pool.connect();
        const nomeDoUsuario = request.params.nome_usuario;

        const buscaNome = 'SELECT * FROM procedure_busca_usuario_pelo_nome($1)';
        const values = [nomeDoUsuario];

        const resultado = await pool.query(buscaNome, values);
        const usuarioEncontrado = resultado.rows;

        response.json(usuarioEncontrado);

    } catch (erro) {

        response.status(404).json(erro);
        console.error(erro);
    }

}

const listarUsuariosPaginar = async (request, response) => {
    try {
        // await pool.connect();
        const valorPagina = request.params.numero_pagina;

        const listaDados = 'SELECT * FROM procedure_busca_usuario_paginacao($1 , 9)';
        const values = [valorPagina];

        const resultado = await pool.query(listaDados, values);
        const dadosPaginacao = resultado.rows;
        response.json({contagem:resultado.rowCount , dados:dadosPaginacao});

    } catch (erro) {

        response.status(404).json(erro);
        console.error(erro);
    }
}


const adicionarUsuarioECrendencial = async (request, response) => {
    let AleatorioHexaId = Math.floor(Date.now() * Math.random()).toString(36);

    const {
        situacao_credencial,
        data_inicial_credencial,
        data_final_credencial,
        direcao,
        credencial,
        credito_credencial,
        tempo_afastamento

    } = request.body;

    const {
        foto_usuario,
        nome_usuario,
        sobrenome_usuario,
        tipo_documento_usuario,
        numero_documento_usuario,
        telefone_usuario,
        email_usuario,
        empresa_usuario,
        tipo_usuario,
        setor_usuario,
        pais_usuario,
        estado_usuario,
        cidade_usuario,
        rua_usuario,
        numero_usuario,
        crendencial_usuario,


    } = request.body;

    const infoCrendencial = {
        id_credencial: AleatorioHexaId,
        situacao_credencial,
        data_inicial_credencial,
        data_final_credencial,
        direcao,
        credencial,
        credito_credencial,
        tempo_afastamento

    }

    const infoUsuario = {
        id_usuario: AleatorioHexaId,
        foto_usuario,
        nome_usuario,
        sobrenome_usuario,
        tipo_documento_usuario,
        numero_documento_usuario,
        telefone_usuario,
        email_usuario,
        empresa_usuario,
        tipo_usuario,
        setor_usuario,
        pais_usuario,
        estado_usuario,
        cidade_usuario,
        rua_usuario,
        numero_usuario,
        crendencial_usuario,

    }


    try {
        // await pool.connect();
        const ProcedureAddUser = 'SELECT procedure_adicionar_usuario_credencial($1,$2)';
        const values = [infoCrendencial, infoUsuario];

        const resultado = await pool.query(ProcedureAddUser, values);
        const AddSucessoRespostaFinal = resultado.rows[0].procedure_adicionar_usuario_credencial;
        response.status(201).json(AddSucessoRespostaFinal);

    } catch (erro) {
        if (erro.code === '23505') {
            response.status(404).json({ situacao: false, msg: "Essa crendencial ja existe no banco de dados. Coloque outra por gentileza!" });
        } else {

            response.status(404).json(erro);
            console.warn(erro);
        }

    }
}


const deletarUsuarioECrendecial = async (request, response) => {
    try {

        // await pool.connect();
        const { id_usuario } = request.body;
        let valorId = { id_usuario };

        const procedureRemoveUser = 'SELECT procedure_remover_usuario($1)';
        const values = [valorId.id_usuario]; // Acessa o valor dentro do objeto da Requisicao 

        const resultado = await pool.query(procedureRemoveUser, values); // Acesse a Documentacao
        const remocaoSucessoRespostaFinal = resultado.rows[0].procedure_remover_usuario;
        response.json(remocaoSucessoRespostaFinal);

    } catch (erro) {

        response.status(404).json(erro);
        console.error(erro);

    }
}


const rotaTestePosts = async (request, response) => {
    try {
        // await pool.connect();
        let randonId = Math.floor(Date.now() * Math.random()).toString(36);
        const cab = JSON.stringify( request.headers['user-agent'] );
        const { id_usuario, credencial } = request.body;
        let requisicaoTeste = { id_usuario, credencial };

        response.json({ id: randonId, requisicaoTeste , nova:cab });
        console.info(cab);

    } catch (erro) {

        response.status(404).json(erro);
        console.warn(erro);

    }
}


const atualizarUsuario = async (request, response) => {

    const {
        id_credencial,
        situacao_credencial,
        data_inicial_credencial,
        data_final_credencial,
        direcao,
        credencial,
        credito_credencial,
        tempo_afastamento

    } = request.body;

    const {
        id_usuario,
        foto_usuario,
        nome_usuario,
        sobrenome_usuario,
        tipo_documento_usuario,
        numero_documento_usuario,
        telefone_usuario,
        email_usuario,
        empresa_usuario,
        tipo_usuario,
        setor_usuario,
        pais_usuario,
        estado_usuario,
        cidade_usuario,
        rua_usuario,
        numero_usuario,
        crendencial_usuario,


    } = request.body;

    const infoCrendencial = {
        id_credencial,
        situacao_credencial,
        data_inicial_credencial,
        data_final_credencial,
        direcao,
        credencial,
        credito_credencial,
        tempo_afastamento

    }

    const infoUsuario = {
        id_usuario,
        foto_usuario,
        nome_usuario,
        sobrenome_usuario,
        tipo_documento_usuario,
        numero_documento_usuario,
        telefone_usuario,
        email_usuario,
        empresa_usuario,
        tipo_usuario,
        setor_usuario,
        pais_usuario,
        estado_usuario,
        cidade_usuario,
        rua_usuario,
        numero_usuario,
        crendencial_usuario,

    }


    try {
        // await pool.connect();
        const ProcedureAtualizarUser = 'SELECT procedure_atualizar_usuario($1,$2,$3)';
        const values = [infoUsuario.id_usuario, infoCrendencial, infoUsuario];

        const resultado = await pool.query(ProcedureAtualizarUser, values);
        const edicaoSucessoRespostaFinal = resultado.rows[0].procedure_atualizar_usuario;
        response.json(edicaoSucessoRespostaFinal);

    } catch (erro) {
        response.status(404).json(erro);
        console.warn(erro);
    }
    
}


// AFASTAMENTOS ------------
const addAfastamento = async (request, response) => {
    let randonId = Math.floor(Date.now() * Math.random()).toString(36);

    const {
        nome_afastamento,
        fg_tempo_afastamento
    } = request.body;

    const infoAfastamento = {
        id_afastamento: randonId,
        nome_afastamento,
        fg_tempo_afastamento
    }

    try {
        // await pool.connect();
        const ProcedureTipoAfasta = 'SELECT procedure_adicionar_tipo_afastamento($1)';
        const values = [ infoAfastamento ];

        const resultado = await pool.query(ProcedureTipoAfasta, values);
        const addSucessoResposta = resultado.rows[0].procedure_adicionar_tipo_afastamento;
        response.json(addSucessoResposta);

    } catch (erro) {
        if (erro.code === 'P0001') {
            response.status(404).json({ situacao: false, msg: "Esse tipo de afastamento ja existe no banco! Por favor coloque outro!" });
        } else {

            response.status(404).json(erro);
            console.warn(erro);
        }

    }
}

const DeletarAfastamento = async (request, response) => {
        const idAfast = request.body.id_afastamento;
    try {
        // await pool.connect();
        const ProcedureDelAfasta = 'SELECT procedure_deletar_afastamento($1)';
        const values = [ idAfast ];

        const resultado = await pool.query(ProcedureDelAfasta, values);
        const respDeletar = resultado.rows[0].procedure_deletar_afastamento;
        response.json(respDeletar);

    } catch (erro) {

        if (erro.code === 'P0001') {
            response.status(404).json({ situacao:false,msg:"O sistema somente permite a exclusao de um afastamento se não haver nenhum usuario atrelado a ele"});
        } else {

            response.status(404).json(erro);
            console.warn(erro);
        }
}
}

const listaTiposAfastamentos = async (request, response) => {
    try {
        // await pool.connect();
        const resultado = await pool.query('SELECT procedure_busca_tipos_afastamentos()');

        const respostaListagem = resultado.rows[0].procedure_busca_tipos_afastamentos;
        response.json(respostaListagem);

    } catch (erro) {

        response.status(404).json(erro);
        console.error(erro);

    }
}

const listaAfastamentosID = async (request, response) => {
    const id = request.params.id_afastamento;
    try {
        // await pool.connect();

        const Procedure = 'SELECT procedure_busca_afastamento_pelo_id($1)';
        const values = [ id ];
        const resultado = await pool.query( Procedure , values );

        const respostaListagem = resultado.rows[0].procedure_busca_afastamento_pelo_id;
        response.json(respostaListagem);

    } catch (erro) {

        response.status(404).json(erro);
        console.error(erro);

    }
}

const atualizarAfastamento = async (request, response) => {
    const id = request.body.id_afastamento;
    const nomeNovo = request.body.nome_afastamento;
    const tempoNovo = request.body.tempo_afastamento;

    try {
        // await pool.connect();

         const ProcedureAtualizar = 'SELECT procedure_atualizar_afastamento($1,$2,$3)';
         const valuesUpdate = [ id , nomeNovo, tempoNovo ];
 
         const resultadoUpdate = await pool.query( ProcedureAtualizar, valuesUpdate );
         const respostaUpdate = resultadoUpdate.rows[0].procedure_atualizar_afastamento;
         response.json(respostaUpdate);

    } catch (erro) {

        if (erro.code === 'P0001') {
            response.status(404).json({ situacao:false,msg:"Heeey! O sistema somente permite atualizacao de um afastamento se não haver nenhum usuario atrelado a ele"});
        } else {

            response.status(404).json(erro);
            console.error(erro);
        }

    }
}


module.exports = {
    listaTodosUsuarios,
    listaUsuarioPeloID,
    adicionarUsuarioECrendencial,
    deletarUsuarioECrendecial,
    rotaTestePosts,
    atualizarUsuario,
    addAfastamento,
    listaTiposAfastamentos,
    DeletarAfastamento,
    listaAfastamentosID,
    atualizarAfastamento,
    listarUsuariosPaginar,
    listaUsuarioNome
}