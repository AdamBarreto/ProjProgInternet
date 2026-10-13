const resultadoRepositorio = require('../models/quizzes/resultadoRepositorio');

const ResultadoService = {

    criar: async (id_quiz, resultado, aluno) => {
        return resultadoRepositorio.criar(
            id_quiz,
            aluno.username,
            resultado.acertos,
            resultado.tempo_conclusao
        );
    },

    listarByAluno: async (aluno) => {
        return resultadoRepositorio.listarByAluno(aluno);
    },

    buscarById: async (id_quiz, id_aluno) => {
        return resultadoRepositorio.buscarById(id_quiz, id_aluno);
    },

    deletar: async (id_quiz, id_aluno) => {
        return resultadoRepositorio.deletar(id_quiz, id_aluno);
    }
};

module.exports = ResultadoService;