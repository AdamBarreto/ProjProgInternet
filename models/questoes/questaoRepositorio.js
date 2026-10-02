const pool = require('../db.js');

const QuestaoRepositorio = {

    criar: async (id_docente, enunciado, etiqueta, tipo) => {

        const resultado = await pool.query(
            `INSERT INTO questao (id_docente, enunciado, etiqueta, tipo)
             VALUES ($1, $2, $3, $4)
             RETURNING questao`,
            [id_docente, enunciado, etiqueta || null, tipo]
        );

        return resultado.rows;
    },

    listarByDocente: async (id_docente) => {
        const resultado = await pool.query(
            'SELECT * FROM questao WHERE id_docente = $1 ORDER BY id_questao DESC',
            [id_docente]
        );

        return resultado.rows;
    },

    atualizar: async (id_questao, enunciado, etiqueta, tipo) => {

        const resultado = await pool.query(
            `UPDATE questao
             SET enunciado = $1, etiqueta = $2, tipo = $3
             WHERE id_questao = $4`,
            [enunciado, etiqueta || null, tipo, id_questao]
        );

        return resultado.rowCount > 0;
    },

    deletar: async (id_questao) => {
        const resultado = await pool.query(
            'DELETE FROM questao WHERE id_questao = $1',
            [id_questao]
        );

        return resultado.rowCount > 0;
    }

};

module.exports = QuestaoRepositorio;
