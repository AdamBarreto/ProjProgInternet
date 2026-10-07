const pool = require('../db.js');

const UsuarioRepositorio = {

    criar: async (nome_completo, nome_usuario, email, senha, role) => {
        const sql = 'INSERT INTO usuario (nome_completo, nome_usuario, email, senha, role) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const valores = [nome_completo, nome_usuario, email, senha, role];
        
        // terei que adicionar ese try catch em outros repositórios
        try {
            const res = await pool.query(sql, valores);
     
            return res.rows[0];
        } catch (erro) {
            // O código '23505' é o erro de UNIQUE no PostgreSQL
            if (erro.code === '23505') {
                if (erro.detail.includes('nome_usuario')) {
                    throw new Error('Este nome de usuário já está em uso.');
                }
                if (erro.detail.includes('email')) {
                    throw new Error('Este e-mail já está cadastrado.');
                }
            }
            throw erro;
        }
    },

    buscarById: async (nome_usuario) => {
        const resultado = await pool.query(
            'SELECT * FROM usuario WHERE nome_usuario = $1',
            [nome_usuario]
        );

        return resultado.rows[0] || null;
    },

    listar: async() => {
        const sql = 'SELECT * FROM usuario';
        const res = await pool.query(sql);
        
        console.log(res.rows)

        return res.rows;
    },
    listarAlunos: async() => {
        const sql = `SELECT * FROM usuario WHERE role = 'aluno'`;
        const res = await pool.query(sql);
        
        return res.rows;
    },
    listarDocentes: async() => {
        const sql = `SELECT * FROM usuario WHERE role = 'docente'`;
        const res = await pool.query(sql);
        
        return res.rows;
    },

    atualizar: async (nome_completo, email, senha, nome_usuario) => {

        const resultado = await pool.query(
            `UPDATE usuario
             SET nome_completo = $1, email = $2, senha = $3
             WHERE nome_usuario = $4`,
            [nome_completo, email, senha, nome_usuario]
        );

        return resultado.rowCount > 0;
    },
    
    deletar: async (nome_usuario) => {
        const resultado = await pool.query(
            'DELETE FROM usuario WHERE nome_usuario = $1',
            [nome_usuario]
        );

        return resultado.rowCount > 0;
    }

};

module.exports = UsuarioRepositorio;
