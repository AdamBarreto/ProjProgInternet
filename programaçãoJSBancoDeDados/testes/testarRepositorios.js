

const { pool, testarConexao } = require('../conexao');

const docenteRepositorio = require('../repositorios/docenteRepositorio');
const alunoRepositorio = require('../repositorios/alunoRepositorio');
const quizRepositorio = require('../repositorios/quizRepositorio');
const questaoRepositorio = require('../repositorios/questaoRepositorio');
const alternativaRepositorio = require('../repositorios/alternativaRepositorio');
const quizQuestaoRepositorio = require('../repositorios/quizQuestaoRepositorio');
const resultadoRepositorio = require('../repositorios/resultadoRepositorio');


const sufixo = Date.now();

async function testarDocente() {
    console.log('\n--- DOCENTE ---');

    const idDocente = await docenteRepositorio.criarDocente({
        nome_completo: 'Professor Teste',
        nome_usuario: 'prof_teste_' + sufixo,
        email: 'prof' + sufixo + '@teste.com',
        senha: 'senha123'
    });
    console.log('Docente criado com sucesso! ID:', idDocente);

    const docente = await docenteRepositorio.buscarDocentePorId(idDocente);
    console.log('Docente encontrado:', docente.nome_completo);

    await docenteRepositorio.atualizarDocente(idDocente, {
        nome_completo: 'Professor Teste Editado',
        nome_usuario: docente.nome_usuario,
        email: docente.email,
        senha: docente.senha
    });
    const docenteAtualizado = await docenteRepositorio.buscarDocentePorId(idDocente);
    console.log('Docente atualizado com sucesso! Novo nome:', docenteAtualizado.nome_completo);

    return idDocente;
}

async function testarAluno() {
    console.log('\n--- ALUNO ---');

    const idAluno = await alunoRepositorio.criarAluno({
        nome_completo: 'Aluno Teste',
        nome_usuario: 'aluno_teste_' + sufixo,
        email: 'aluno' + sufixo + '@teste.com',
        senha: 'senha123'
    });
    console.log('Aluno criado com sucesso! ID:', idAluno);

    const aluno = await alunoRepositorio.buscarAlunoPorId(idAluno);
    console.log('Aluno encontrado:', aluno.nome_completo);

    return idAluno;
}

async function testarQuiz(idDocente) {
    console.log('\n--- QUIZ ---');

    const idQuiz = await quizRepositorio.criarQuiz({
        id_docente: idDocente,
        disciplina: 'História',
        quantidade_questoes: 1
    });
    console.log('Quiz criado com sucesso! ID:', idQuiz);

    const quizzesDoDocente = await quizRepositorio.listarQuizzesPorDocente(idDocente);
    console.log('Quizzes desse docente:', quizzesDoDocente.length);

    return idQuiz;
}

async function testarQuestaoEAlternativas(idDocente) {
    console.log('\n--- QUESTAO / ALTERNATIVA ---');

    const idQuestao = await questaoRepositorio.criarQuestao({
        id_docente: idDocente,
        enunciado: 'Em que ano o Brasil foi descoberto?',
        etiqueta: 'História',
        tipo: 4
    });
    console.log('Questão criada com sucesso! ID:', idQuestao);

    const idAltA = await alternativaRepositorio.criarAlternativa({
        id_questao: idQuestao, texto: '1500', correta: true
    });
    const idAltB = await alternativaRepositorio.criarAlternativa({
        id_questao: idQuestao, texto: '1822', correta: false
    });
    console.log('Alternativas criadas com sucesso! IDs:', idAltA, idAltB);

    const alternativas = await alternativaRepositorio.listarAlternativasPorQuestao(idQuestao);
    console.log('Alternativas dessa questão:', alternativas.length);

    return idQuestao;
}

async function testarQuizQuestao(idQuiz, idQuestao) {
    console.log('\n--- QUIZ_QUESTAO ---');

    await quizQuestaoRepositorio.adicionarQuestaoAoQuiz(idQuiz, idQuestao);
    console.log('Questão vinculada ao quiz com sucesso!');

    const questoesDoQuiz = await quizQuestaoRepositorio.listarQuestoesDoQuiz(idQuiz);
    console.log('Questões desse quiz:', questoesDoQuiz.length);
}

async function testarResultado(idQuiz, idAluno) {
    console.log('\n--- RESULTADO ---');

    const idResultado = await resultadoRepositorio.criarResultado({
        id_quiz: idQuiz,
        id_aluno: idAluno,
        acertos: 1,
        tempo_conclusao: 12.5,
        pontuacao_final: 100
    });
    console.log('Resultado registrado com sucesso! ID:', idResultado);

    const ranking = await resultadoRepositorio.listarRankingGeral();
    console.log('Registros no ranking geral:', ranking.length);

    return idResultado;
}


async function limparDadosDeTeste(ids) {
    console.log('\n--- LIMPEZA ---');

    if (ids.idResultado) await resultadoRepositorio.deletarResultado(ids.idResultado);
    if (ids.idQuiz && ids.idQuestao) await quizQuestaoRepositorio.removerQuestaoDoQuiz(ids.idQuiz, ids.idQuestao);
    if (ids.idQuestao) await questaoRepositorio.deletarQuestao(ids.idQuestao); // apaga as alternativas via CASCADE
    if (ids.idQuiz) await quizRepositorio.deletarQuiz(ids.idQuiz);
    if (ids.idAluno) await alunoRepositorio.deletarAluno(ids.idAluno);
    if (ids.idDocente) await docenteRepositorio.deletarDocente(ids.idDocente);

    console.log('Dados de teste removidos com sucesso!');
}

async function rodarTestes() {
    console.log('============================================================');
    console.log('INICIANDO TESTES DOS REPOSITÓRIOS');
    console.log('============================================================');

    const conexaoOk = await testarConexao();
    if (!conexaoOk) {
        console.log('Corrija a conexão com o banco (veja o .env) antes de rodar os testes.');
        process.exit(1);
    }

    const ids = {};

    try {
        ids.idDocente = await testarDocente();
        ids.idAluno = await testarAluno();
        ids.idQuiz = await testarQuiz(ids.idDocente);
        ids.idQuestao = await testarQuestaoEAlternativas(ids.idDocente);

        await testarQuizQuestao(ids.idQuiz, ids.idQuestao);

        ids.idResultado = await testarResultado(ids.idQuiz, ids.idAluno);

        console.log('\n============================================================');
        console.log('TODOS OS TESTES PASSARAM COM SUCESSO!');
        console.log('============================================================');
    } catch (erro) {
        console.error('\nUm dos testes falhou:', erro.message);
    } finally {
        await limparDadosDeTeste(ids);
        await pool.end();
    }
}

rodarTestes();
