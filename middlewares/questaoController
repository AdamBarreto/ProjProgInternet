const QuestaoService = require('../services/questaoService');

const tratarErro = (res, erro) => {
    res.status(erro.status || 500).json({ erro: erro.message });
};

const QuestaoApiController = {

    criar: async (req, res) => {
        try {
            const questao = await QuestaoService.criar(req.body, req.user);
            res.status(201).json(questao);
        } catch (erro) {
            tratarErro(res, erro);
        }
    },

    listar: async (req, res) => {
        try {
            const questoes = await QuestaoService.listarMinhas(req.user);
            res.status(200).json(questoes);
        } catch (erro) {
            tratarErro(res, erro);
        }
    },

    atualizar: async (req, res) => {
        try {
            const questao = await QuestaoService.atualizar(req.params.id, req.body, req.user);
            res.status(200).json(questao);
        } catch (erro) {
            tratarErro(res, erro);
        }
    },

    deletar: async (req, res) => {
        try {
            await QuestaoService.deletar(req.params.id, req.user);
            res.status(204).send();
        } catch (erro) {
            tratarErro(res, erro);
        }
    }
};

module.exports = { QuestaoApiController };