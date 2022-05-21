const pool = require('../Model/ConnectioDB');

const listaRelatorios = async (request, response) => {
    try {
        await pool.connect();
        const resultado = await pool.query('SELECT procedure_relatorios_todos()');

        const respostalistaTodos = resultado.rows[0].procedure_relatorios_todos;
        response.json(respostalistaTodos);

    } catch (erro) {

        response.status(404).json(erro);
        console.warn(erro);

    }
}

const listaDadosCredencialeData = async (request, response) => {
    try {
        const credencial = request.query.credencial_buscada;
        const dataDeInicio = request.query.data_inicial;
        const dataDeFinal = request.query.data_final;

        await pool.connect();

        let values = [ credencial ,dataDeInicio , dataDeFinal ];

        const buscaPorDataECredencial =  'SELECT procedure_busca_relatorio_pela_datahora($1, $2, $3)';
        const resultado = await pool.query( buscaPorDataECredencial, values );

        const listagemResposta = resultado.rows[0].procedure_busca_relatorio_pela_datahora;
        response.json(listagemResposta);

    } catch (erro) {

        response.status(404).json(erro);
        console.warn(erro);

    }
}

module.exports = { listaRelatorios , listaDadosCredencialeData  };