const express = require('express');
const app = express();
app.use(express.json());

const questaoRoutes = require('./routes/questaoRoutes.js');
app.use('/usuario/:id/questoes', questaoRoutes);

const usuariosRoutes = require('./routes/usuarios');
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

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000')
});