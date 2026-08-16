const pool = require('../conexao');

const QuestaoRepositorio = {

    criarQuestao: async (id_docente, enunciado, etiqueta, tipo) => {

        const resultado = await pool.query(
            `INSERT INTO questao (id_docente, enunciado, etiqueta, tipo)
             VALUES ($1, $2, $3, $4)
             RETURNING id_questao`,
            [id_docente, enunciado, etiqueta || null, tipo]
        );

        return resultado.rows[0].id_questao;
    },

    QuestoesDocente: async (idDocente) => {
        const resultado = await pool.query(
            'SELECT * FROM questao WHERE id_docente = $1 ORDER BY id_questao DESC',
            [idDocente]
        );

        return resultado.rows;
    },

    atualizarQuestao: async (idQuestao, enunciado, etiqueta, tipo) => {

        const resultado = await pool.query(
            `UPDATE questao
             SET enunciado = $1, etiqueta = $2, tipo = $3
             WHERE id_questao = $4`,
            [enunciado, etiqueta || null, tipo, idQuestao]
        );

        return resultado.rowCount > 0;
    },

    deletarQuestao: async (idQuestao) => {
        const resultado = await pool.query(
            'DELETE FROM questao WHERE id_questao = $1',
            [idQuestao]
        );

        return resultado.rowCount > 0;
    }

};

module.exports = QuestaoRepositorio;
