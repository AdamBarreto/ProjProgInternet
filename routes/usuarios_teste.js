const express = require('express');
const router = express.Router();

const { alunoApiController, docenteApiController } = require('../controllers/usuarioApiController');
const { validar, usuarioSchema } = require('../middlewares/validacao')
const { createToken, verifyJWT, requireRole} = require('../middlewares/jwt')

// ALUNO -> adicionar o Role 'admin'?
router.get('/aluno', verifyJWT, requireRole(['docente']), alunoApiController.listar);
router.post('/aluno', validar(usuarioSchema), createToken('aluno'), alunoApiController.criar);

// DOCENTE 
router.get('/docente', verifyJWT, requireRole(['docente']), docenteApiController.listar);
router.post('/docente', validar(usuarioSchema), createToken('docente'), docenteApiController.criar)

module.exports = router