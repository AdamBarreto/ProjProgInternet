const QuizService = require('../services/quizService');

const QuizApiController = {
    criar: async (req, res, next) => {
        try {
            const quiz = await QuizService.criar(req.body, req.user);
            res.status(201).json(quiz);
        } catch (error) {
            next(error);
        }
    },

    listarByDocente: async (req, res, next) => {
        try {
            const quizzes = await QuizService.listarByDocente(req.user);
            res.status(200).json(quizzes);
        } catch (error) {
            next(error);
        }
    },

    buscarById: async (req, res, next) => {
        try {
            const quiz = await QuizService.exibirQuiz(req.params.idQuiz, req.user);
            res.status(200).json(quiz);
        } catch (error) {
            next(error);
        }
    },

    deletar: async (req, res, next) => {
        try {
            await QuizService.deletar(req.params.idQuiz, req.user);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    },

    listarQuestoes: async (req, res, next) => {
        try {
            const questoes = await QuizService.listarQuestoes(req.params.idQuiz, req.user);
            res.status(200).json(questoes);
        } catch (error) {
            next(error);
        }
    },

    adicionarQuestao: async (req, res, next) => {
        try {
            const questao = await QuizService.adicionarQuestao(req.params.idQuiz, req.body.id_questao, req.user);
            res.status(201).json(questao);
        } catch (error) {
            next(error);
        }
    },

    removerQuestao: async (req, res, next) => {
        try {
            await QuizService.removerQuestao(req.params.idQuiz, req.params.idQuestao, req.user);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
};

module.exports = { QuizApiController };
