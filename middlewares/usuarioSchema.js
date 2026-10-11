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

const loginSchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    senha: { type: 'string' }
  },
  required: ['username', 'senha'],
  additionalProperties: false
};

module.exports = {
  cadastroUsuarioSchema,
  atualizarUsuarioSchema,
  loginSchema
};