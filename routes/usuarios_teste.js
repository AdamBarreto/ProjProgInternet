const express = require('express');
const usuarioApiControler = require('../controllers/usuarioApiController');
const router = express.Router();
const { validar, verifyJWT, verifyAutorization, requireRole, usuarioSchema, tarefaSchema, JWT_EXPIRES, JWT_SECRET } = require('../middlewares/validacao')

router.get('/', verifyJWT, requireRole(['docente']), usuarioApiControler.all);

module.exports = router