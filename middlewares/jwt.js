const jwt = require('jsonwebtoken');

const JWT_SECRET = 'chave_secreta_do_servidor';
const JWT_EXPIRES = 120

const blacklist = {} // Objeto que vai armazenar os tokens revogados

const createToken = (role) => (req, res) => {
    const payload = { username: req.body.username, role: role};
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES});
    res.json(token).status(201);
};

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const token = authHeader.replace('Bearer ', ''); // Removendo a string 'Bearer ' do header
  
  if (blacklist[token]) { return res.status(403).json({ message: 'Token inválido ou sessão encerrada.' })};

  try {
      // Valida a assinatura digital e se o prazo (exp) não expirou
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Anexa o payload decodificado ao req
      next();
  } catch (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};

const verifyProfile = (req, res, next) => {
  if (req.params.username == req.user.username) {
    return next()
  };

  return res.status(401).json({erro: "O token deve se referir à sua conta"});
}

const requireRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ erro: 'Você não tem permissão para acessar esta rota.' });
  }

  return next();
};

module.exports = { createToken, verifyJWT, verifyProfile, requireRole };