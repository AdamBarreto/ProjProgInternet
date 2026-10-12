const AlternativaRepositorio = require('../models/questoes/alternativaRepositorio');
const QuestaoRepositorio = require('../models/questoes/questaoRepositorio');

const erroHttp = (status, mensagem) => {
    const erro = new Error(mensagem);
    erro.status = status;
    return erro;
};

const validarId = (id) => {
    const idNumerico = Number(id);
    if (!Number.isInteger(idNumerico) || idNumerico < 1) {
        throw erroHttp(400, 'Identificador de questão inválido');
    }
    return idNumerico;
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

const buscarQuestaoDoDocente = async (id, usuario) => {
    const questao = await QuestaoRepositorio.buscarById(validarId(id));
    if (!questao) throw erroHttp(404, 'Questão não encontrada');
    if (questao.id_docente !== usuario.username) {
        throw erroHttp(403, 'Você só pode acessar suas próprias questões');
    }
    return questao;
};

const QuestaoService = {
    criar: async (questao, usuario) => {
        validarGabarito(questao);
        return QuestaoRepositorio.criarCompleta(usuario.username, prepararQuestao(questao));
    },

    exibirQuestao: async (id, usuario) => {
        const questao = await buscarQuestaoDoDocente(id, usuario);
        const alternativas = await AlternativaRepositorio.listarByQuestao(questao.id_questao);
        return { ...questao, alternativas };
    },

    listarByDocente: async (usuario) => {
        return QuestaoRepositorio.listarByDocente(usuario.username);
    },

    atualizar: async (id, questao, usuario) => {
        const existente = await buscarQuestaoDoDocente(id, usuario);
        validarGabarito(questao);
        const atualizada = await QuestaoRepositorio.atualizarCompleta(
            existente.id_questao,
            prepararQuestao(questao)
        );
        if (!atualizada) throw erroHttp(404, 'Questão não encontrada');
        return atualizada;
    },

    deletar: async (id, usuario) => {
        const existente = await buscarQuestaoDoDocente(id, usuario);
        return QuestaoRepositorio.deletar(existente.id_questao);
    }
};

module.exports = QuestaoService;
