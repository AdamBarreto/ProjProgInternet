const express = require('express');
const router = express.Router({ mergeParams: true });

const { QuestaoApiController } = require('../controllers/questaoController');
const { validar } = require('../middlewares/validacao');
const questaoSchema = require('../middlewares/schemas/questaoSchema');
const { verifyJWT, requireRole } = require('../middlewares/jwt');

router.use(verifyJWT, requireRole(['docente']), (req, res, next) => {
    if (req.params.id !== req.user.username) {
        return res.status(403).json({ erro: 'Você só pode acessar suas próprias questões' });
    }
    next();
});

router.post('/', validar(questaoSchema), QuestaoApiController.criar);
router.get('/', QuestaoApiController.listarByDocente);
router.get('/:idQuestao', QuestaoApiController.buscarById);
router.put('/:idQuestao', validar(questaoSchema), QuestaoApiController.atualizar);
router.delete('/:idQuestao', QuestaoApiController.deletar);

module.exports = router;