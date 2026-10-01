const express = require('express');
const jwt = require('jsonwebtoken')
const alunoRepositorio = require('../models/alunoRepositorio')
const docenteRepositorio = require('../models/docenteRepositorio')
const router = express.Router();
const { validar, verifyJWT, verifyAutorization, usuarioSchema, JWT_EXPIRES, JWT_SECRET } = require('../middlewares/validacao');


let users = []

// POST (Cadastro)
router.post('/', validar(usuarioSchema), (req, res) => {
    const { name, username, role, password } = req.body;
    
    const newUsuario = { name, username, role, password };

    const payload = { username: username, role: role};
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES});

    users.push(newUsuario)
    res.json({token: token}).status(201)
})

//POST (Login)
router.post('/login', validar(usuarioSchema), (req, res) => {
  const { username, password } = req.body;
  const usuario = users.find(u => u.username === username && u.password === password);
    
  if (!usuario) { return res.status(401).json("nome de usuário ou senha incorretos"); }

  const payload = { username: usuario.username, role: usuario.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES});

    res.json({token});
})

//GET (verificar autenticação)
router.get('/profile', verifyJWT, (req, res) => {
    res.json({ message: 'Acesso autorizado!', user: req.user });
});

// GET (um)
router.get('/:username', verifyJWT, verifyAutorization, (req, res) => {
  const usuario = users.find(u => u.username === req.params.username);

  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });
  res.status(200).json(usuario);
});

//GET (todos)
router.get('/', (req, res) => {

    if (users == '') {
        res.json("Usuários não encontrados.").status(404)
    }

    res.json(users).status(200)
})

// PUT
router.put('/:username', validar(usuarioSchema), verifyJWT, verifyAutorization, (req, res) => {
  const { username } = req.params;
  if (username !== req.user.username) {
    return res.status(401).json({ erro: 'O token deve se referir à sua conta' });
  }

  const usuarioIndex = users.findIndex(u => u.username === username);
  if (usuarioIndex === -1) return res.status(404).json({ erro: 'Usuário não encontrado.' });

  const { name, role, password } = req.body;
  users[usuarioIndex] = { name, username, role, password };
  res.json(users[usuarioIndex]);
})

// DELETE
router.delete('/:username', verifyJWT, verifyAutorization, (req, res) => {
  if (req.params.username !== req.user.username) {
    return res.status(401).json({ erro: 'O token deve se referir à sua conta' });
  }

  users = users.filter(u => u.username !== username)
  res.sendStatus(204)
})

module.exports = router;