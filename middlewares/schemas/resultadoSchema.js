const resultadoSchema = {
    type: 'object',
    properties: {
        id_quiz: { type: 'integer', minimum: 1 },
        id_aluno: { type: 'string' },
        acertos: { type: 'integer', minimum: 0 },
        tempo_conclusao: { type: 'number', minimum: 0 }
    },
    required: ['id_quiz', 'id_aluno', 'acertos', 'tempo_conclusao'],
    additionalProperties: false
};

module.exports = { resultadoSchema };