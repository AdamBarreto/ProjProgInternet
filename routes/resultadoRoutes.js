const express = require('express');
const router = express.Router({ mergeParams: true });

const { ResultadoApiController } = require('../controllers/resultadoController');
const { validar } = require('../middlewares/validacao');
const { resultadoSchema } = require('../middlewares/schemas/resultadoSchema');
const { verifyJWT, requireRole } = require('../middlewares/jwt');


const verificarAluno = (req, res, next) => {
    if (req.params.id !== req.user.username) {
        return res.status(403).json({ erro: 'Você só pode acessar seus próprios resultados' });
    }
    next();
};

router.post('/quizzes/:idQuiz/resultado', verifyJWT, requireRole(['aluno']), verificarAluno, validar(resultadoSchema), ResultadoApiController.criar);
router.get('/resultado', verifyJWT, requireRole(['aluno']), verificarAluno, ResultadoApiController.listarByAluno);
router.get('/quizzes/:idQuiz/resultado', verifyJWT, requireRole(['aluno']), verificarAluno, ResultadoApiController.buscarById);
router.delete('/quizzes/:idQuiz/resultado', verifyJWT, requireRole(['aluno']), verificarAluno, ResultadoApiController.deletar);

module.exports = router;