const questaoSchema = {
  type: 'object',
  properties: {
    enunciado: { type: 'string', minLength: 5 },
    etiqueta: { type: 'string' },
    tipo: { type: 'string', enum: ['multipla_escolha', 'verdadeiro_falso'] },
    gabarito: { type: 'integer', minimum: 1, maximum: 4 },
    alternativas: {
      type: 'array',
      items: { type: 'string' },
      minItems: 2, maxItems: 4
    }
  },
  required: ['enunciado', 'etiqueta', 'tipo', 'gabarito', 'alternativas'],
  additionalProperties: false
};

module.exports = questaoSchema;