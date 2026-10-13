const QuizRepositorio = require('../models/quizzes/quizRepositorio');
const QuizQuestaoRepositorio = require('../models/quizzes/quizQuestaoRepositorio');
const QuestaoRepositorio = require('../models/questoes/questaoRepositorio');

const erroHttp = (status, mensagem) => {
    const erro = new Error(mensagem);
    erro.status = status;
    return erro;
};

const QuizService = {
    criar: async (quiz, usuario) => {
        const id_quiz = await QuizRepositorio.criar(
            usuario.username,
            quiz.disciplina.trim(),
            quiz.quantidade_questoes
        );
        return { id_quiz: id_quiz };
    },

    listarByDocente: async (usuario) => {
        return QuizRepositorio.listarByDocente(usuario.username);
    },

    exibirQuiz: async (id_quiz) => {
        const quiz = await QuizRepositorio.buscarById(id_quiz);
        const questoes = await QuizQuestaoRepositorio.listar(quiz.id_quiz);
        return { ...quiz, questoes };
    },

    deletar: async (id_quiz) => {
        try {
            return await QuizRepositorio.deletar(id_quiz);
        } catch (error) {
            if (error.code === '23503') {
                throw erroHttp(409, 'Não é possível excluir um quiz que possui resultados');
            }
            throw error;
        }
    },

    listarQuestoes: async (id_quiz) => {
        return await QuizQuestaoRepositorio.listar(id_quiz);
    },

    adicionarQuestao: async (id_quiz, id_questao) => {
        return await QuizQuestaoRepositorio.adicionar(id_quiz, id_questao);
    },

    removerQuestao: async (id_quiz, id_questao) => {        
        return await QuizQuestaoRepositorio.adicionar(id_quiz, id_questao);
    }
};

module.exports = QuizService;
