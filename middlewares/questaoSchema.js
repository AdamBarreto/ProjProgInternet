const criarQuestaoSchema = {
  type: 'object',
  properties: {
    enunciado: { type: 'string', minLength: 5 },
    etiqueta: { type: 'string' },
    tipo: { type: 'string' },
    gabarito: { type: 'integer' },
    alternativas: {
      type: 'array',
      items: { type: 'string' },
      minItems: 2, maxItems: 4
    }
  },
  required: ['enunciado', 'etiqueta', 'tipo', 'gabarito', 'alternativas'],
  additionalProperties: false
};

module.exports = criarQuestaoSchema;