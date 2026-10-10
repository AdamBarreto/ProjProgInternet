const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_do_servidor';
const JWT_EXPIRES = process.env.JWT_EXPIRES || 1200;

const blacklist = new Set();

const gerarToken = (usuario) => {
    const payload = { 
      username: usuario.nome_usuario || usuario.username,
      role: usuario.role};

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES});
};

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.slice(7);
  
  if (blacklist.has(token)) {
    return res.status(403).json({ message: 'Token inválido ou sessão encerrada.' });
  }

  try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      req.token = token;
      next();
  } catch {
      return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};

const verifyAuth = (req, res, next) => {
  if (req.params.username === req.user.username || req.user.role === 'admin') {
    return next()
  };

  return res.status(401).json({erro: "Você não pode acessar os dados de outro usuário."});
};

const requireRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ erro: 'Você não tem permissão para acessar esta rota.' });
  }

  return next();
};

module.exports = { gerarToken, verifyJWT, verifyAuth, requireRole, blacklist, JWT_SECRET, JWT_EXPIRES };