
const pool = require('../Model/ConnectioDB');

const listaTodosAcessos = async ( request, response ) => {
    try {
        await pool.connect();
        const resultado = await pool.query('SELECT * FROM procedure_todos_acessos()');
        
        const listaTodosAcessosRespostaFinal = resultado.rows;
        response.json(listaTodosAcessosRespostaFinal);

    } catch (erro) {
        response.status(404).json(erro);
        console.warn(erro);
    }
}




const listaAcessoPelaCredencial = async ( request, response ) => {
    try {
        await pool.connect();
        const credencialProcurada = request.params.credencial;
        const procedureBuscaAcessoCredencial = 'SELECT procedure_busca_acesso_pela_credencial($1)';

        let values = [credencialProcurada];
        const resultado = await pool.query( procedureBuscaAcessoCredencial, values );
        
        const listaCrendRespostaFinal = resultado.rows[0].procedure_busca_acesso_pela_credencial;
        response.json(listaCrendRespostaFinal);

    } catch (erro) {
        response.status(404).json(erro);
        console.warn(erro);
    }
}

const ultimoAcesso = async ( request, response ) => {
    try {
        await pool.connect();
        const procedureBuscaAcessoCredencial = 'SELECT procedure_busca_ultimo_acesso()';

        const resultado = await pool.query( procedureBuscaAcessoCredencial );
        
        const ultimoAcesso = resultado.rows[0].procedure_busca_ultimo_acesso;
        response.json( ultimoAcesso );

    } catch (erro) {
        response.status(404).json(erro);
        console.warn(erro);
    }
}


const listaAcessoPelaData = async ( request, response ) => {
    try {
        await pool.connect();
        const dataDeInicio = request.query.data_inicial;
        const dataDeFinal = request.query.data_final;

        const procedureBuscaAcessoPelaData = 'SELECT procedure_busca_acesso_pela_datahora($1,$2)';
        let values = [dataDeInicio,dataDeFinal];
        const resultado = await pool.query( procedureBuscaAcessoPelaData, values );
        
        const listaAcessoPorData = resultado.rows[0].procedure_busca_acesso_pela_datahora;
        response.json(listaAcessoPorData);

    } catch (erro) {
        response.status(404).json(erro);
        console.warn(erro);
    }
}


const checkinDeControleAcesso = async ( request, response ) => {
    try {
        await pool.connect();
        const credencialAserValidada = request.body.credencial;
        const direcaoAcesso = request.body.direcao;

        const procedureBuscaAcessoPelaData = 'SELECT procedure_verifica_se_existe_credencial($1,$2)';
        let values = [ credencialAserValidada , direcaoAcesso ];
        const resultado = await pool.query( procedureBuscaAcessoPelaData, values );
        
        const listaAcessoPorData = resultado.rows[0].procedure_verifica_se_existe_credencial;
        response.status(202).json(listaAcessoPorData);

    } catch (erro) {
        response.status(404).json(erro);
        console.warn(erro);
    }
}


const buscaDados30DiasPorCriterio = async ( request, response ) => {
    try {
        await pool.connect();


        const procedureNegados = "SELECT procedure_busca_ultimo_periodo('30 Days', '%ACESSO NEGADO%')";
        const procedureLiberados = "SELECT procedure_busca_ultimo_periodo('30 Days', '%ACESSO LIBERADO%')";
        const procedureBarrados = "SELECT procedure_busca_ultimo_periodo('30 Days', '%ACESSO BARRADO%')";
        const negados = await pool.query( procedureNegados );
        const liberado = await pool.query( procedureLiberados );
        const barrados = await pool.query( procedureBarrados );
        
        const acessosNegado = negados.rows[0].procedure_busca_ultimo_periodo;
        const acessosLiberados = liberado.rows[0].procedure_busca_ultimo_periodo;
        const acessosBarrados = barrados.rows[0].procedure_busca_ultimo_periodo;

        response.json( [
            { acessos_negados:acessosNegado },
             { acessos_liberado:acessosLiberados },
              { acessos_barrados:acessosBarrados }
            ] );

    } catch (erro) {
        response.status(404).json(erro);
        console.warn(erro);
    }
}


const busca4meses = async ( request, response ) => {
    try {
        await pool.connect();
        const dados4meses = "SELECT procedure_busca_ultimo_4meses()";
        const resultado = await pool.query( dados4meses );
        
        const acessosNegado = resultado.rows[0].procedure_busca_ultimo_4meses;


        response.json( acessosNegado );

    } catch (erro) {
        response.status(404).json(erro);
        console.warn(erro);
    }
}

const contarTodos30Dias = async ( request, response ) => {
    try {
        await pool.connect();


        const procedure = "SELECT procedure_busca_ultimo_periodo('30 Days', '%ACESSO LIBERADO%')";
        const resultado = await pool.query( procedure );
        
        const acessos = resultado.rows[0].procedure_busca_ultimo_periodo;


        response.json( acessos );

    } catch (erro) {
        response.status(404).json(erro);
        console.warn(erro);
    }
}

const contaTodosAcessoHoje = async ( request, response ) => {
    try {
        await pool.connect();


        const procedure = "SELECT procedure_busca_ultimo_periodo('1 Days', '%ACESSO LIBERADO%')";
        const resultado = await pool.query( procedure );
        
        const acessos = resultado.rows[0].procedure_busca_ultimo_periodo;


        response.json( acessos );

    } catch (erro) {
        response.status(404).json(erro);
        console.warn(erro);
    }
}



module.exports = { listaTodosAcessos,
     listaAcessoPelaCredencial,
      listaAcessoPelaData,
       checkinDeControleAcesso,
        ultimoAcesso,
        buscaDados30DiasPorCriterio,
         busca4meses,
         contarTodos30Dias,
         contaTodosAcessoHoje
        }