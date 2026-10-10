const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, coerceTypes: true });


const cadastroUsuarioSchema = {
  type: 'object',
  properties: {
    nome: {type: 'string'},
    username: { type: 'string'},
    email: { type: 'string'},
    senha: { type: 'string'},
    role: { type: 'string', enum: ['aluno', 'docente', 'admin'] }
  },
  required: ['nome', 'username', 'email', 'senha', 'role'],
  additionalProperties: false
};

const loginSchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    senha: { type: 'string' }
  },
  required: ['username', 'senha'],
  additionalProperties: false
};

const atualizarUsuarioSchema = {
  type: 'object',
  properties: {
    nome: { type: 'string' },
    email: { type: 'string' },
    senha: { type: 'string' }
  },
  required: ['nome', 'email', 'senha'],
  additionalProperties: false
};

function validar(schema) {
  const validate = ajv.compile(schema); //cria uma func de validação

  return (req, res, next) => {
    if (validate(req.body)) {
      return next();
    }

    const erros = validate.errors.map(e => ({
      campo: e.params.missingProperty || e.params.additionalProperty || e.instancePath.slice(1) || 'body',
      mensagem: e.message
    }));

    res.status(400).json({ erro: 'Dados inválidos', detalhes: erros });
  };
}


module.exports = {
  validar,
  cadastroUsuarioSchema,
  loginSchema,
  atualizarUsuarioSchema
};
