const pool = require('../db.js');

const ResultadoRepositorio = {

    criar: async (id_quiz, id_aluno, acertos, tempo_conclusao) => {

        const saida = await pool.query(
            `INSERT INTO resultado (id_quiz, id_aluno, acertos, tempo_conclusao)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [id_quiz, id_aluno, acertos, tempo_conclusao]
        );

        return saida.rows[0];
    },

    //para o professor (tenho que ajeitar)
    listarByQuiz: async (id_quiz) => {
        const resultado = await pool.query(
            `SELECT r.id_aluno, a.nome_completo, r.acertos, r.tempo_conclusao
             FROM resultado r
             INNER JOIN aluno a ON a.nome_usuario = r.id_aluno
             WHERE r.id_quiz = $1
             ORDER BY r.acertos DESC`,
            [id_quiz]
        );

        return resultado.rows;
    },

    //resultados do aluno em quizes
    listarByAluno: async (id_aluno) => {
        const resultado = await pool.query(
            'SELECT * FROM resultado WHERE id_aluno = $1',
            [id_aluno]
        );

        return resultado.rows;
    },

    buscarById: async (id_quiz, id_aluno) => {
        const resultado = await pool.query(
            `SELECT r.acertos, r.tempo_conclusao, q.disciplina, q.quantidade_questoes
            FROM resultado r
            INNER JOIN quiz q ON r.id_quiz = q.id_quiz
            WHERE r.id_aluno = $1 AND r.id_quiz = $2`,
            [id_aluno, id_quiz]
        );

        return resultado.rows[0];
    },

    deletar: async (id_quiz, id_aluno) => {
        const resultado = await pool.query(
            'DELETE FROM resultado WHERE id_quiz = $1 AND id_aluno = $2',
            [id_quiz, id_aluno]
        );

        return resultado.rowCount > 0;
    }

};

module.exports = ResultadoRepositorio;
