const AuthService = require('../services/authService')

const LoginController = {
    login : async (req, res) => {
        const dados = req.body
        const token = await AuthService.login(dados.username, dados.senha)
        res.status(200).json({ token })
    },

    logout : async (req, res) => {
        const token = req.token
        AuthService.logout(token)
        res.status(200).json({ msg: 'Logout realizado com sucesso' })
    }
}

module.exports = LoginController;