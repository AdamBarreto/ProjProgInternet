const express = require('express');
const router = express.Router();

const { UsuarioApiController } = require('../controllers/usuarioController');
const LoginController = require('../controllers/loginController');

const { validar } = require('../middlewares/validacao');
const { cadastroUsuarioSchema, loginSchema, atualizarUsuarioSchema } = require('../middlewares/schemas/usuarioSchema');

const { verifyJWT, verifyAuth, requireRole } = require('../middlewares/jwt');

router.post('/cadastro', validar(cadastroUsuarioSchema), UsuarioApiController.criar);
router.post('/login', validar(loginSchema), LoginController.login);
router.post('/logout', verifyJWT, LoginController.logout);

router.get('/usuario/:username', verifyJWT, requireRole(['admin']), UsuarioApiController.buscarById);
router.put(
    '/usuario/:username',
    verifyJWT,
    verifyAuth,
    validar(atualizarUsuarioSchema),
    UsuarioApiController.atualizar
);
router.delete('/usuario/:username', verifyJWT, verifyAuth, UsuarioApiController.deletar);

//testes
router.get('/verusuarios', UsuarioApiController.listar);
router.get('/usuario', verifyJWT, requireRole(['admin']), UsuarioApiController.listar);
router.get('/aluno', verifyJWT, requireRole(['admin']), UsuarioApiController.listarAlunos);
router.get('/docente', verifyJWT, requireRole(['admin']), UsuarioApiController.listarDocentes);
router.get('/admin', verifyJWT, requireRole(['admin']), UsuarioApiController.listarAdmins);

module.exports = router;
