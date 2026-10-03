
const alunoRepositorio = require('../models/usuarios/alunoRepositorio')
const docenteRepositorio = require('../models/usuarios/docenteRepositorio')

const alunoApiController = {
    listar : async (req, res, next) => {
        try {
            const alunos = await alunoRepositorio.listar()
            res.json(alunos).status(200);
        } catch (error) {
            next(error);
        }
    },
    criar : async (req, res, next) => {
        try {
            const dados = req.body;
            const aluno = await alunoRepositorio.criar(dados.nome, dados.username, dados.email, dados.senha);
            res.json(aluno).status(201);
        } catch (error) {
            next(error);
        }
    }
};

const docenteApiController = {
    listar : async (req, res, next) => {
        try {
            const docentes = await docenteRepositorio.listar()
            res.json(docentes).status(200);
        } catch (error) {
            next(error);
        }
    },
    criar : async (req, res, next) => {
        try {
            const dados = req.body;
            const docente = await docenteRepositorio.criar(dados.nome, dados.username, dados.email, dados.senha);
            res.json(docente).status(201);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = { alunoApiController, docenteApiController };