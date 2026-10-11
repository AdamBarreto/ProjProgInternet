const express = require('express');
const router = express.Router();

const { QuestaoApiController } = require('../controllers/questaoController');
const { validar } = require('../middlewares/validacao');
const criarQuestaoSchema = require('../middlewares/questaoSchema');
const { verifyJWT, requireRole } = require('../middlewares/jwt');

router.post('/', verifyJWT, requireRole(['docente']), validar(criarQuestaoSchema), QuestaoApiController.criar);
router.get('/', verifyJWT, requireRole(['docente']), QuestaoApiController.listar);
router.put('/:id', verifyJWT, requireRole(['docente']), validar(criarQuestaoSchema), QuestaoApiController.atualizar);
router.delete('/:id', verifyJWT, requireRole(['docente']), QuestaoApiController.deletar);

module.exports = router;