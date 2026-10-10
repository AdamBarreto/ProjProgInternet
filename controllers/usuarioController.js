
const UsuarioService = require('../services/usuarioService');

const semSenha = (usuario) => {
    if (!usuario) return usuario;
    const { senha, ...dadosPublicos } = usuario;
    return dadosPublicos;
};

const UsuarioApiController = {
    criar : async (req, res, next) => {
        try {
            const dados = req.body;
            const usuarioNovo = await UsuarioService.criar(dados);
            res.status(201).json({
                token: usuarioNovo.token,
                usuario: semSenha(usuarioNovo.usuario)
            });
        } catch (error) {
            next(error);
        }
    },
    listar : async (req, res, next) => {
        try {
            const usuarios = await UsuarioService.listar();
            res.status(200).json(usuarios.map(semSenha));
        } catch (error) {
            next(error);
        }
    },
    buscarById : async (req, res, next) => {
        try {
            const username = req.params.username;
            const usuario = await UsuarioService.buscarById(username);
            if (!usuario) {
                return res.status(404).json({ erro: 'Usuário não encontrado.' });
            }
            res.status(200).json(semSenha(usuario));
        } catch (error) {
            next(error);
        }
    },
    listarAlunos : async (req, res, next) => {
        try {
            const alunos = await UsuarioService.listarAlunos();
            res.status(200).json(alunos.map(semSenha));
        } catch (error) {
            next(error);
        }
    },
    listarDocentes : async (req, res, next) => {
        try {
            const docentes = await UsuarioService.listarDocentes();
            res.status(200).json(docentes.map(semSenha));
        } catch (error) {
            next(error);
        }
    },
    listarAdmins : async (req, res, next) => {
        try {
            const admins = await UsuarioService.listarAdmins();
            res.status(200).json(admins.map(semSenha));
        } catch (error) {
            next(error);
        }
    },
    atualizar : async (req, res, next) => {
        try {
            const atualizado = await UsuarioService.atualizar(req.params.username, req.body);
            if (!atualizado) {
                return res.status(404).json({ erro: 'Usuário não encontrado.' });
            }
            const usuario = await UsuarioService.buscarById(req.params.username);
            res.status(200).json(semSenha(usuario));
        } catch (error) {
            next(error);
        }
    },
    deletar : async (req, res, next) => {
        try {
            const resultado = await UsuarioService.deletar(req.params.username);
            if (!resultado) {
                return res.status(404).json({ erro: 'Usuário não encontrado.' });
            }
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    },
};

module.exports = { UsuarioApiController };