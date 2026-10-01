const pool = require('../conexao');

const QuizQuestaoRepositorio = {

    addQuestaoInQuiz: async (id_quiz, id_questao) => {
        //posso adicionar um for aqui pra ir as questoes tudo de uma vez 
        await pool.query(
            `INSERT INTO quiz_questao (id_quiz, id_questao)
             VALUES ($1, $2)`,
            [id_quiz, id_questao]
        );

        return true;
    },

    listar: async (id_quiz) => {
        const resultado = await pool.query(
            `SELECT q.*
             FROM quiz_questao qq
             INNER JOIN questao q ON q.id_questao = qq.id_questao
             WHERE qq.id_quiz = $1`,
            [id_quiz]
        );

        return resultado.rows;
    },

    removerQuestaoInQuiz: async (id_quiz, id_questao) => {
        const resultado = await pool.query(
            'DELETE FROM quiz_questao WHERE id_quiz = $1 AND id_questao = $2',
            [id_quiz, id_questao]
        );

        return true;
    }

};

module.exports = QuizQuestaoRepositorio;
