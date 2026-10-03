const pool = require('../db.js');

const AlunoRepositorio = {

    criar: async (nome_completo, nome_usuario, email, senha) => {
        const sql = 'INSERT INTO aluno (nome_completo, nome_usuario, email, senha) VALUES ($1, $2, $3, $4) RETURNING aluno';
        const valores = [nome_completo, nome_usuario, email, senha];
        
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

    buscarById: async (id_aluno) => {
        const resultado = await pool.query(
            'SELECT * FROM aluno WHERE nome_usuario = $1',
            [id_aluno]
        );

        return resultado.rows[0] || null;
    },

    listar: async() => {
        const sql = 'SELECT * FROM aluno';
        const res = await pool.query(sql);
        
        return res.rows;
    },

    atualizar: async (nome_completo, id_docente, email, senha) => {;

        const resultado = await pool.query(
            `UPDATE docente
             SET nome_completo = $1, nome_usuario = $2, email = $3, senha = $4
             WHERE id_docente = $5`,
            [nome_completo, nome_usuario, email, senha, id_docente]
        );

        return resultado.rowCount > 0;
    },
    
    deletar: async (id_aluno) => {
        const resultado = await pool.query(
            'DELETE FROM aluno WHERE nome_usuario = $1',
            [id_aluno]
        );

        return resultado.rowCount > 0;
    }

};

module.exports = AlunoRepositorio;
