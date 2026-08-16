const pool = require('../conexao');

const QuizRepositorio = {

    criarQuiz: async (id_docente, disciplina, quantidade_questoes) => {

        const resultado = await pool.query(
            `INSERT INTO quiz (id_docente, disciplina, quantidade_questoes)
             VALUES ($1, $2, $3)
             RETURNING id_quiz`,
            [id_docente, disciplina, quantidade_questoes]
        );

        return resultado.rows[0].id_quiz;
    },

    listarQuizzes: async () => {
        const resultado = await pool.query('SELECT * FROM quiz ORDER BY id_quiz DESC');
        return resultado.rows;
    },

    listarQuizDocente: async (idDocente) => {
        const resultado = await pool.query(
            'SELECT * FROM quiz WHERE id_docente = $1 ORDER BY id_quiz DESC',
            [idDocente]
        );

        return resultado.rows;
    },

    //provavelmente não vai ser usado
    deletarQuiz: async (idQuiz) => {
        const resultado = await pool.query(
            'DELETE FROM quiz WHERE id_quiz = $1',
            [idQuiz]
        );

        return resultado.rowCount > 0;
    }

};

module.exports = QuizRepositorio;
