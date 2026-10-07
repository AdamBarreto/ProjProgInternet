
const usuarioRepositorio = require('../models/usuarios/usuarioRepositorio')
const { gerarToken } = require('../middlewares/jwt')

const adminApiControler = {
    listar : async (req, res, next) => {
        try {
            const usuarios = await usuarioRepositorio.listar()
            res.json(usuarios).status(200);
        } catch (error) {
            next(error);
        }
    }
}

const alunoApiController = {
    listar : async (req, res, next) => {
        try {
            const usuario = await usuarioRepositorio.listarAlunos()

            res.json(alunos).status(200);
        } catch (error) {
            next(error);
        }
    },
    criar : async (req, res, next) => {
        try {
            const dados = req.body;
            const aluno = await usuarioRepositorio.criar(dados.nome, dados.username, dados.email, dados.senha, 'aluno');
            token = gerarToken(aluno)
            res.status(201).json({
                token,
                usuario: usuarioResposta
            });
        } catch (error) {
            next(error);
        }
    }
};

const docenteApiController = {
    listar : async (req, res, next) => {
        try {
            const docentes = await usuarioRepositorio.listarDocentes()
            res.json(docentes).status(200);
        } catch (error) {
            next(error);
        }
    },
    criar : async (req, res, next) => {
        try {
            const dados = req.body;
            const docente = await usuarioRepositorio.criar(dados.nome, dados.username, dados.email, dados.senha, 'docente');
            token = gerarToken(docente)
            res.status(201).json({
                token,
                usuario: usuarioResposta
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = { adminApiControler, alunoApiController, docenteApiController };