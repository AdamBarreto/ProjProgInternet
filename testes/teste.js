const pool = require('../conexao');

const alunoRepositorio = require('../models/alunoRepositorio');
const docenteRepositorio = require('../models/docenteRepositorio');
const quizRepositorio = require('../models/quizRepositorio');
const questaoRepositorio = require('../models/questaoRepositorio');
const alternativaRepositorio = require('../models/alternativaRepositorio');
const quizQuestaoRepositorio = require('../models/quizQuestaoRepositorio');
const resultadoRepositorio = require('../models/resultadoRepositorio');

function getResultado(res) {
    console.log(res);
}

//ALUNO
//alunoRepositorio.criar('Marcia', 'maria_s', 'maria@email.com', '999999').then(getResultado);
alunoRepositorio.buscarById('maria_s').then(getResultado);
//alunoRepositorio.listar().then(getResultado);
//alunoRepositorio.deletarById('joao_btt').then(getResultado);

//DOCENTE
//docenteRepositorio.criar('Adam Professor', 'adam_ss', 'adam@email.com', '122122').then(getResultado);
//docenteRepositorio.listar().then(getResultado);
//docenteRepositorio.buscarById('adam_ss').then(getResultado);
//docenteRepositorio.atualizar('Adam Professor Silva', 'adam_ss', 'adam.silva@email.com', 'nova_senha').then(getResultado);
//docenteRepositorio.deletar('adam_ss').then(getResultado);

//QUIZ
//quizRepositorio.criar('adam_ss', 'Matemática', 10).then(getResultado);
//quizRepositorio.listar().then(getResultado);
//quizRepositorio.listarByDocente('adam_ss').then(getResultado);
//quizRepositorio.deletar(1).then(getResultado);

//QUESTÃO
//questaoRepositorio.criar('adam_ss', 'Quantos anos tem o Professor João', 'Conhecimentos-Gerais', 4).then(getResultado);
//questaoRepositorio.criar('adam_ss', 'Um triângulo escaleno é aquele que possui: (alternativas)', 'Matemática-Trig', 2).then(getResultado);
//questaoRepositorio.listarByDocente('adam_ss').then(getResultado);
//questaoRepositorio.deletar(i).then(getResultado);

//questaoRepositorio.atualizar(1, 'Quantos anos tem o Professor de Redes?', 'Conhecimentos-Gerais', 4).then(getResultado);

//ALTERNATIVAS (ordem = 1, 2, 3 e 4 = A, B, C e D)
// args: id_questao, gabarito, textosArray
//alternativaRepositorio.criar(1, 2, ['10 anos', '20 anos', '30 anos', '40 anos']).then(getResultado);
//alternativaRepositorio.deletar(1).then(getResultado);
//alternativaRepositorio.listarByQuestao(1).then(getResultado);
//alternativaRepositorio.atualizar(1, 1, '9 anos', false).then(getResultado);


//QUIZ_QUESTAO (AS QUESTOES DO QUIZ)
//quizQuestaoRepositorio.addQuestaoInQuiz(1, 1).then(getResultado);
//quizQuestaoRepositorio.removerQuestaoInQuiz(1, 1).then(getResultado);
//quizQuestaoRepositorio.listar(1).then(getResultado);

//RESULTADOS
//resultadoRepositorio.criar(1, 'joao_btt', 8, 120).then(getResultado);
//resultadoRepositorio.buscarByQuiz(1).then(getResultado);
//resultadoRepositorio.buscarByAluno('joao_btt').then(getResultado);
//resultadoRepositorio.buscarByQuizByAluno(1, 'joao_btt').then(getResultado);