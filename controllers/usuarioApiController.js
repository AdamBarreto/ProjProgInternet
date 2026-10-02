
const alunoRepositorio = require('../models/usuarios/alunoRepositorio')

UsuarioApiControler = {
    all : async (req, res, next) => {
        try {
            const alunos = await alunoRepositorio.listar()
            res.json(alunos).status(200);
        } catch (error) {
            next(error);
        }
    },
}

module.exports = UsuarioApiControler;