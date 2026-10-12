const QuestaoService = require('../services/questaoService');

const QuestaoApiController = {

    criar: async (req, res, next) => {
        try {
            const questao = await QuestaoService.criar(req.body, req.user);
            res.status(201).json(questao);
        } catch (error) {
            next(error);
        }
    },

    listarByDocente: async (req, res, next) => {
        try {
            const questoes = await QuestaoService.listarByDocente(req.user);
            res.status(200).json(questoes);
        } catch (error) {
            next(error);
        }
    },

    buscarById: async (req, res, next) => {
        try {
            const questao = await QuestaoService.exibirQuestao(req.params.idQuestao, req.user);
            res.status(200).json(questao);
        } catch (error) {
            next(error);
        }
    },

    atualizar: async (req, res, next) => {
        try {
            const questao = await QuestaoService.atualizar(req.params.idQuestao, req.body, req.user);
            res.status(200).json(questao);
        } catch (error) {
            next(error);
        }
    },

    deletar: async (req, res, next) => {
        try {
            await QuestaoService.deletar(req.params.idQuestao, req.user);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
};

module.exports = { QuestaoApiController };