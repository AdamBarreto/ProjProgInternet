const express = require('express');
const app = express();
app.use(express.json());

const usuariosRoutes = require('./routes/usuarios_teste');

app.use('/usuario', usuariosRoutes);


app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000')
});