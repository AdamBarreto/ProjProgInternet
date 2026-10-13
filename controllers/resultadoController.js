const ResultadoService = require('../services/resultadoService');

const ResultadoApiController = {

    criar: async (req, res, next) => {
        try {
            const resultado = await ResultadoService.criar(req.params.idQuiz, req.body, req.user);
            res.status(201).json(resultado);
        } catch (error) {
            next(error);
        }
    },

    listarByAluno: async (req, res, next) => {
        try {
            const resultado = await ResultadoService.listarByAluno(req.user.username);
            res.status(200).json(resultado);
        } catch (error) {
            next(error);
        }
    },

    listarByQuiz: async (req, res, next) => {
        try {
            const resultado = await ResultadoService.listarByAluno(req.user.username);
            res.status(200).json(resultado);
        } catch (error) {
            next(error);
        }
    },

    buscarById: async (req, res, next) => {
        try {
            const resultado = await ResultadoService.buscarById(req.params.idQuiz, req.user.username);
            res.status(200).json(resultado);
        } catch (error) {
            next(error);
        }
    },

    deletar: async (req, res, next) => {
        try {
            await ResultadoService.deletar(req.params.idQuiz, req.user.username);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
};

module.exports = { ResultadoApiController };