const express = require('express');
const router = express.Router();

const { UsuarioApiController } = require('../controllers/usuarioController');
const LoginController = require('../controllers/loginController');

const { validar } = require('../middlewares/validacao');
const { cadastroUsuarioSchema, loginSchema, atualizarUsuarioSchema } = require('../middlewares/usuarioSchema');

const { verifyJWT, verifyAuth, requireRole } = require('../middlewares/jwt');

router.post('/usuario', validar(cadastroUsuarioSchema), UsuarioApiController.criar);
router.post('/login', validar(loginSchema), LoginController.login);
router.post('/logout', verifyJWT, LoginController.logout);

router.get('/profile', verifyJWT, (req, res) => {
    res.status(200).json({ usuario: req.user });
});
router.get('/usuario', verifyJWT, requireRole(['admin']), UsuarioApiController.listar);
router.get('/aluno', verifyJWT, requireRole(['admin']), UsuarioApiController.listarAlunos);
router.get('/docente', verifyJWT, requireRole(['admin']), UsuarioApiController.listarDocentes);
router.get('/admin', verifyJWT, requireRole(['admin']), UsuarioApiController.listarAdmins);

router.get('/usuario/:username', verifyJWT, requireRole(['admin']), UsuarioApiController.buscarById);
router.put(
    '/usuario/:username',
    verifyJWT,
    verifyAuth,
    validar(atualizarUsuarioSchema),
    UsuarioApiController.atualizar
);
router.delete('/usuario/:username', verifyJWT, verifyAuth, UsuarioApiController.deletar);

module.exports = router;
