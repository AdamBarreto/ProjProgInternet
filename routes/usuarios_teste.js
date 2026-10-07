const express = require('express');
const router = express.Router();

const { adminApiControler, alunoApiController, docenteApiController } = require('../controllers/usuarioApiController');
const { validar, usuarioSchema } = require('../middlewares/validacao')
const { createToken, verifyJWT, requireRole} = require('../middlewares/jwt')

// ALUNO -> adicionar o Role 'admin'?
router.get('/aluno', verifyJWT, requireRole(['docente']), alunoApiController.listar);
router.post('/aluno', validar(usuarioSchema), alunoApiController.criar);

// DOCENTE 
router.get('/docente', verifyJWT, requireRole(['docente']), docenteApiController.listar);
router.post('/docente', validar(usuarioSchema), docenteApiController.criar)

router.get('/admin', adminApiControler.listar);

module.exports = router