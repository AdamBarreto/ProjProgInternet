const pool = require('../conexao');

const AlternativaRepositorio = {

    criarAlternativas: async (id_questao, gabarito, textosArray) => {
    // textosArray exemplo: ['Resp A', 'Resp B', 'Resp C', 'Resp D']
    
    for (let i = 0; i < textosArray.length; i++) {
        const ordem = i + 1; // Gera 1, 2, 3, 4
        const texto = textosArray[i];
        const correta = (i === gabarito - 1);

        await pool.query(
            `INSERT INTO alternativa (id_questao, ordem_alternativa, texto, correta)
             VALUES ($1, $2, $3, $4)`,
            [id_questao, ordem, texto, correta]
        );
    }

        return true;
    },

    listarAlternativasPorQuestao: async (idQuestao) => {
        const resultado = await pool.query(
            'SELECT * FROM alternativa WHERE id_questao = $1 ORDER BY ordem_alternativa',
            [idQuestao]
        );

        return resultado.rows;
    },

    atualizarAlternativa: async (idQuestao, ordem, texto, correta) => {

        // iremos, talvez, usar um for aqui, ou outro lugar
        const resultado = await pool.query(
            `UPDATE alternativa
             SET texto = $1, correta = $2
             WHERE id_questao = $3 AND ordem_alternativa = $4
             ORDER BY ordem_alternativa`,
            [texto, correta, idQuestao, ordem]
        );

        return resultado.rowCount > 0;
    },

    deletarAlternativasQuestao: async (idQuestao) => { 
        //
        const resultado = await pool.query(
            'DELETE FROM alternativa WHERE id_questao = $1',
            [idQuestao]
        );

        return true;
    }

};

module.exports = AlternativaRepositorio;
