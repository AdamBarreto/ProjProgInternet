const UsuarioRepositorio = require('../models/usuarios/usuarioRepositorio');
const { gerarToken } = require('../middlewares/jwt');

const UsuarioService = {

    criar : async (usuario) => {
        const usuarioNovo = await UsuarioRepositorio.criar(
            usuario.nome,
            usuario.username,
            usuario.email,
            usuario.senha,
            usuario.role
        );
        const token = gerarToken(usuarioNovo);
        return { token, usuario: usuarioNovo };
    },

    buscarById : async (username) => {
        const usuario = await UsuarioRepositorio.buscarById(username);
        return usuario
    },

    atualizar : async (username, usuario) => {
        const usuarioAtualizado = await UsuarioRepositorio.atualizar(
            usuario.nome,
            usuario.email,
            usuario.senha,
            username
        );
        return usuarioAtualizado
    },

    listar : async () => {
        const usuarios = await UsuarioRepositorio.listar();
        return usuarios
    },
    listarAlunos : async () => {
        const alunos = await UsuarioRepositorio.listarAlunos();
        return alunos
    },
    listarDocentes : async () => {
        const docentes = await UsuarioRepositorio.listarDocentes();
        return docentes
    },

    listarAdmins : async () => {
        return UsuarioRepositorio.listarAdmins();
    },

    deletar : async (username) => {
        const resultado = await UsuarioRepositorio.deletar(username)
        return resultado
    }
}

module.exports = UsuarioService;