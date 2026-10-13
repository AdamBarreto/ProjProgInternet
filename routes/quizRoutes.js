const express = require('express');
const router = express.Router({ mergeParams: true });

const { QuizApiController } = require('../controllers/quizController');
const { validar } = require('../middlewares/validacao');
const { criarQuizSchema, adicionarQuestaoQuizSchema } = require('../middlewares/schemas/quizSchema');
const { verifyJWT, requireRole } = require('../middlewares/jwt');

router.use(verifyJWT, requireRole(['docente']), (req, res, next) => {
    if (req.params.id !== req.user.username) {
        return res.status(403).json({ erro: 'Você só pode acessar seus próprios quizzes' });
    }
    next();
});

router.post('/', validar(criarQuizSchema), QuizApiController.criar);
router.get('/', QuizApiController.listarByDocente);
router.get('/:idQuiz', QuizApiController.buscarById);
router.delete('/:idQuiz', QuizApiController.deletar);
router.get('/:idQuiz/questoes', QuizApiController.listarQuestoes);
router.post('/:idQuiz/questoes', validar(adicionarQuestaoQuizSchema), QuizApiController.adicionarQuestao);
router.delete('/:idQuiz/questoes/:idQuestao', QuizApiController.removerQuestao);

module.exports = router;
