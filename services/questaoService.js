const AlternativaRepositorio = require('../models/questoes/alternativaRepositorio');
const QuestaoRepositorio = require('../models/questoes/questaoRepositorio');

const erroHttp = (status, mensagem) => {
    const erro = new Error(mensagem);
    erro.status = status;
    return erro;
};

const prepararQuestao = (questao) => {
    const { gabarito, alternativas, ...dadosQuestao } = questao;
    return {
        ...dadosQuestao,
        alternativas: alternativas.map((texto, indice) => ({
            ordem: indice + 1,
            texto,
            correta: indice + 1 === gabarito
        }))
    };
};

const QuestaoService = {
    criar: async (questao, usuario) => {
        return QuestaoRepositorio.criarCompleta(usuario.username, prepararQuestao(questao));
    },

    exibirQuestao: async (id) => {
        const questao = await QuestaoRepositorio.buscarById(id);
        const alternativas = await AlternativaRepositorio.listarByQuestao(questao.id_questao);
        return { ...questao, alternativas };
    },

    listarByDocente: async (usuario) => {
        return QuestaoRepositorio.listarByDocente(usuario.username);
    },

    atualizar: async (id, questao) => {
        const existente = await QuestaoRepositorio.buscarById(id);
  
        const atualizada = await QuestaoRepositorio.atualizarCompleta(
            existente.id_questao,
            prepararQuestao(questao)
        );
        if (!atualizada) throw erroHttp(404, 'Questão não encontrada');
        return atualizada;
    },

    deletar: async (id) => {
        const existente = await QuestaoRepositorio.buscarById(id);
        return QuestaoRepositorio.deletar(existente.id_questao);
    }
};

module.exports = QuestaoService;
