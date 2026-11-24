const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/public", express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const questaoRoutes = require('./routes/questaoRoutes.js');
app.use('/usuario/:id/questoes', questaoRoutes);

const resultadoRoutes = require('./routes/resultadoRoutes.js');
app.use('/usuario/:id', resultadoRoutes);

const quizRouter = require('./routes/quizRoutes.js');
app.use('/usuario/:id/quizzes', quizRouter);

const usuariosRoutes = require('./routes/usuarioRoutes');
app.use(usuariosRoutes);

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const status = err.status || 500;
    if (status >= 500) {
        console.error(err);
    }

    res.status(status).json({ erro: status >= 500 ? 'Erro interno do servidor.' : err.message });
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});
app.get('/index', (req, res) => {
    res.render('index');
})

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000')
});