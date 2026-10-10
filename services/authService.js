const UsuarioService = require('./usuarioService')
const { blacklist } = require('../middlewares/jwt');

const AuthService = {
    login : async (username, senha) => {
        const usuario = await UsuarioService.buscarById(username)
        if (!usuario || !usuario.senha) {
            const error = new Error('Usuário ou senha inválidos');
            error.status = 401;
            throw error;
        }

        if (senha !== usuario.senha) {
            const error = new Error('Usuário ou senha inválidos');
            error.status = 401;
            throw error;
        }

        return require('../middlewares/jwt').gerarToken(usuario);
    },

    logout : (token) => {
        if (!token || typeof token !== 'string') {
            throw new Error('Token inválido')
        }
        blacklist.add(token);
    },

    validateToken : (token) => {
        if (!token || typeof token !== 'string') {
            throw new Error('Token inválido')
        }

        if (blacklist.has(token)) {
            throw new Error('Token revogado')
        }

        try {
            const payload = require('jsonwebtoken').verify(
                token,
                require('../middlewares/jwt').JWT_SECRET
            );
            return payload
        } catch (err) {
            throw new Error('Token inválido ou expirado')
        }
    }
}

module.exports = AuthService;