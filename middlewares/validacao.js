const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, coerceTypes: true });


// Schema do usuário
const usuarioSchema = {
  type: 'object',
  properties: {
    nome: {type: 'string'},
    username: { type: 'string'},
    email: { type: 'string'},
    senha: { type: 'string'}
  },
  required: ['nome','username', 'email', 'senha'],
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


module.exports = { validar, usuarioSchema};
