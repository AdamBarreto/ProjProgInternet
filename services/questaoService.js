const AlternativaRepositorio = require('../models/questoes/alternativaRepositorio');
const QuestaoRepositorio = require('../models/questoes/questaoRepositorio'); // ajuste o caminho
const { listarByDocente } = require('../models/quizzes/quizRepositorio');

const erroHttp = (status, mensagem) => {
    const erro = new Error(mensagem);
    erro.status = status;
    return erro;
};

function async inserirAlternativas (id_questao, gabarito, textosArray) {
    // textosArray exemplo: ['Resp A', 'Resp B', 'Resp C', 'Resp D']
    let alternativaList = new Set();
    for (let i = 0; i < textosArray.lenght; i++) {
        const ordem = i + 1; // Gera 1, 2, 3, 4
        const texto = textosArray[i];
        const correta = (i === gabarito - 1);
        const alternativa = await AlternativaRepositorio.criar(id_questao, ordem, texto, correta);
        alternativaList.add(alternativa)
    };
    return alternativaList;
}

const QuestaoService = {

    criar: async (questao, usuario) => {
        const questaoNova = await QuestaoRepositorio.criar(
            usuario.username,          // id_docente
            questao.enunciado,
            questao.etiqueta,
            questao.tipo
        );
        const alternativas = await QuestaoService.inserirAlternativas(
            questaoNova.id,
            questao.gabarito,
            questao.alternativas
        );

        return {
            ...questaoNova,
            alternativas: alternativas
        };
    },

    exibirQuestao: async (id_questao) => {
        const questao = await QuestaoRepositorio.buscarById(id_questao);
        const alternativas = await AlternativaRepositorio.listarByQuestao(id_questao);

        return {
            ...questao,
            alternativas: alternativas
        };
    },

    listarByDocente: async (usuario) => {
        return QuestaoRepositorio.listarByDocente(usuario.username);
    },

    atualizar: async (id, questao, usuario) => {
        const existente = await QuestaoRepositorio.buscarById(id);
        if (!existente) throw erroHttp(404, 'Questão não encontrada');
        if (existente.id_docente !== usuario.username) {
            throw erroHttp(403, 'Você só pode alterar suas próprias questões');
        }

        await QuestaoRepositorio.atualizar(id, questao.enunciado, questao.etiqueta, questao.tipo);
        return QuestaoRepositorio.buscarById(id);
    },

    deletar: async (id, usuario) => {
        const existente = await QuestaoRepositorio.buscarById(id);
        if (!existente) throw erroHttp(404, 'Questão não encontrada');
        if (existente.id_docente !== usuario.username) {
            throw erroHttp(403, 'Você só pode excluir suas próprias questões');
        }

        return QuestaoRepositorio.deletar(id);
    }
};

module.exports = QuestaoService;