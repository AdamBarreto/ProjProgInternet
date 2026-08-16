const pool = require('../conexao');

const alunoRepositorio = require('../repositorios/alunoRepositorio');
const docenteRepositorio = require('../repositorios/docenteRepositorio');
const quizRepositorio = require('../repositorios/quizRepositorio');
const questaoRepositorio = require('../repositorios/questaoRepositorio');
const alternativaRepositorio = require('../repositorios/alternativaRepositorio');
const quizQuestaoRepositorio = require('../repositorios/quizQuestaoRepositorio');
const resultadoRepositorio = require('../repositorios/resultadoRepositorio');

//ALUNO
//alunoRepositorio.criar('João Batista', 'joao_btt', 'joao@email.com', '456789').then (res => {
//	console.log(res);
//});
//alunoRepositorio.listar().then(res => {
//	console.log(res);
//});
//alunoRepositorio.buscarAluno('joao_btt').then(res => {
//	console.log(res);
//});
//alunoRepositorio.atualizarAluno(1, 'João Batista Silva', 'joao_btt', 'joao.silva@email.com', 'nova_senha').then(res => {
//	console.log(res);
//});
//alunoRepositorio.deletarAluno('joao_btt').then(res => {
//	console.log(res);
//});

//DOCENTE
//docenteRepositorio.criar('Adam Professor', 'adam_ss', 'adam@email.com', '122122').then (res => {
//	console.log(res);
//});
//docenteRepositorio.listar().then(res => {
//	console.log(res);
//});
//docenteRepositorio.buscarDocente('adam_ss').then(res => {
//	console.log(res);
//});
//docenteRepositorio.atualizarDocente('Adam Professor Silva', 'adam_ss', 'adam.silva@email.com', 'nova_senha').then(res => {
//	console.log(res);
//});
//docenteRepositorio.deletarDocente('adam_ss').then(res => {
//	console.log(res);
//});

//QUIZ
//quizRepositorio.criarQuiz('adam_ss', 'Matemática', 10).then(res => {
//	console.log(res);
//});
//quizRepositorio.listarQuizzes().then(res => {
//	console.log(res);
//});
//quizRepositorio.listarQuizDocente('adam_ss').then(res => {
//	console.log(res);
//});
//quizRepositorio.deletarQuiz(1).then(res => {
//	console.log(res);
//});

//QUESTÃO
//questaoRepositorio.criarQuestao('adam_ss', 'Quantos anos tem o Professor de Redes?', 'Conhecimentos-Gerais', 4).then(res => {
//	console.log(res);
//});
//questaoRepositorio.criarQuestao('adam_ss', 'Um triângulo escaleno é aquele que possui: (alternativas)', 'Matemática-Trig', 2).then(res => {
//	console.log(res);
//});
//questaoRepositorio.QuestoesDocente('adam_ss').then(res => {
//	console.log(res);
//});
//questaoRepositorio.deletarQuestao(2).then(res => {
//	console.log(res);
//});
//questaoRepositorio.atualizarQuestao(1, 'Quantos anos tem o Professor de Redes?', 'Conhecimentos-Gerais', 4).then(res => {
//	console.log(res);
//});

//ALTERNATIVAS (ordem = 1, 2, 3 e 4 = A, B, C e D)
//alternativaRepositorio.criarAlternativas(1, 2, ['10 anos', '20 anos', '30 anos', '40 anos']).then(res => {
//	console.log(res);
//});
//alternativaRepositorio.deletarAlternativasQuestao(1).then(res => {
//	console.log(res);
//});
//alternativaRepositorio.listarAlternativasPorQuestao(1).then(res => {
//	console.log(res);
//});
//alternativaRepositorio.atualizarAlternativa(1, 1, '9 anos', false).then(res => {
//	console.log(res);
//});


//QUIZ_QUESTAO (AS QUESTOES DO QUIZ)
//quizQuestaoRepositorio.addQuestaoQuiz(1, 1).then(res => {
//	console.log(res);
//});
//quizQuestaoRepositorio.removerQuestaoDoQuiz(1, 1).then(res => {
//	console.log(res);
//});
//quizQuestaoRepositorio.listarQuests(1).then(res => {
//	console.log(res);
//});

//RESULTADOS
//resultadoRepositorio.criarResultado(1, 'joao_btt', 8, 120).then(res => {
//	console.log(res);
//});
//resultadoRepositorio.desempenhoQuiz(1).then(res => {
//	console.log(res);
//});
//resultadoRepositorio.resultadosAluno('joao_btt').then(res => {
//	console.log(res);
//});
//resultadoRepositorio.verDesempenhoNoQuiz('joao_btt', 1).then(res => {
//	console.log(res);
//});