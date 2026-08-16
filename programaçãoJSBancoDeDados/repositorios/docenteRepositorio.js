const pool = require('../conexao');

const DocenteRepositorio = {

    criar: async (nome_completo, nome_usuario, email, senha) => {
        const sql = 'INSERT INTO docente (nome_completo, nome_usuario, email, senha) VALUES ($1, $2, $3, $4) RETURNING nome_usuario';
        const valores = [nome_completo, nome_usuario, email, senha];
    
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

    buscarDocente: async (idDocente) => {
        const resultado = await pool.query(
            'SELECT * FROM docente WHERE nome_usuario = $1',
            [idDocente]
        );

        return resultado.rows[0] || null;
    },

    listar: async() => {
        const sql = 'SELECT * FROM docente';
        const res = await pool.query(sql);
        
        return res.rows;
    },

    atualizarDocente: async (nome_completo, idDocente, email, senha) => {;

        const resultado = await pool.query(
            `UPDATE docente
             SET nome_completo = $1, nome_usuario = $2, email = $3, senha = $4
             WHERE id_docente = $5`,
            [nome_completo, nome_usuario, email, senha, idDocente]
        );

        return resultado.rowCount > 0;
    },

    deletarDocente: async (idDocente) => {
        const resultado = await pool.query(
            'DELETE FROM docente WHERE id_docente = $1',
            [idDocente]
        );

        return resultado.rowCount > 0;
    }

};

module.exports = DocenteRepositorio;
