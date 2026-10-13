const criarQuizSchema = {
  type: 'object',
  properties: {
    disciplina: { type: 'string', minLength: 1, maxLength: 30 },
    quantidade_questoes: { type: 'integer', minimum: 1 }
  },
  required: ['disciplina', 'quantidade_questoes'],
  additionalProperties: false
};

const adicionarQuestaoQuizSchema = {
  type: 'object',
  properties: {
    id_questao: { type: 'integer', minimum: 1 }
  },
  required: ['id_questao'],
  additionalProperties: false
};

module.exports = { criarQuizSchema, adicionarQuestaoQuizSchema };
