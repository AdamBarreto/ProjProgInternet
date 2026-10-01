const Ajv = require('ajv');
const jwt = require('jsonwebtoken')

const ajv = new Ajv({ allErrors: true, coerceTypes: true });


// Schema do usuário
const usuarioSchema = {
  type: 'object',
  properties: {
    usuarioId: { type: 'integer', minimum: 1 },
    username: { type: 'string'},
    password: { type: 'string'}
  },
  required: ['usuarioId','username', 'password'], //usuarioId talvez não precise
  additionalProperties: false
};

// Schema da tarefa
const tarefaSchema = {
  type: 'object',
  properties: {
    tarefaId: { type: 'integer', minimum: 1 },
    descricao: { type: 'string', minLength: 3, maxLength: 200 }
  },
  required: ['tarefaId', 'descricao'],
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

const JWT_SECRET = 'chave_secreta_do_servidor';
const JWT_EXPIRES = 120

const blacklist = {} // Objeto que vai armazenar os tokens revogados

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const token = authHeader.replace('Bearer ', ''); // Removendo a string 'Bearer ' do header
  
  if (blacklist[token]) {
      return res.status(403).json({ message: 'Token inválido ou sessão encerrada.' });
  }

  try {
      // Valida a assinatura digital e se o prazo (exp) não expirou
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Anexa o payload decodificado ao req
      next();
  } catch (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};

const verifyAutorization = (req, res, next) => {
  if (req.params.id == req.user.usuarioId) {
    return next()
  };

  return res.status(401).json({erro: "O token deve se referir à sua conta"});
}
module.exports = { validar, verifyJWT, verifyAutorization, usuarioSchema, tarefaSchema, JWT_EXPIRES, JWT_SECRET };
