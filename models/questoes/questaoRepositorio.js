const pool = require('../db.js');

const QuestaoRepositorio = {

    criarCompleta: async (id_docente, questao) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const resultado = await client.query(
                `INSERT INTO questao (id_docente, enunciado, etiqueta, tipo)
                 VALUES ($1, $2, $3, $4)
                 RETURNING *`,
                [id_docente, questao.enunciado, questao.etiqueta, questao.tipo]
            );
            const questaoNova = resultado.rows[0];
            const alternativas = await inserirAlternativas(
                client,
                questaoNova.id_questao,
                questao.alternativas
            );
            await client.query('COMMIT');
            return { ...questaoNova, alternativas };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    },

    criar: async (id_docente, enunciado, etiqueta, tipo) => {

        const resultado = await pool.query(
            `INSERT INTO questao (id_docente, enunciado, etiqueta, tipo)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [id_docente, enunciado, etiqueta || null, tipo]
        );

        return resultado.rows[0];
    },

    listarByDocente: async (id_docente) => {
        const resultado = await pool.query(
            'SELECT * FROM questao WHERE id_docente = $1 ORDER BY id_questao DESC',
            [id_docente]
        );

        return resultado.rows;
    },

    buscarById: async (id_questao) => {
        const resultado = await pool.query(
            'SELECT * FROM questao WHERE id_questao = $1',
            [id_questao]
        );

        return resultado.rows[0];
    },

    atualizarCompleta: async (id_questao, questao) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const resultado = await client.query(
                `UPDATE questao
                 SET enunciado = $1, etiqueta = $2, tipo = $3
                 WHERE id_questao = $4
                 RETURNING *`,
                [questao.enunciado, questao.etiqueta || null, questao.tipo, id_questao]
            );
            if (resultado.rowCount === 0) {
                await client.query('ROLLBACK');
                return null;
            }

            await client.query('DELETE FROM alternativa WHERE id_questao = $1', [id_questao]);
            const alternativas = await inserirAlternativas(client, id_questao, questao.alternativas);
            await client.query('COMMIT');
            return { ...resultado.rows[0], alternativas };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    },

    atualizar: async (id_questao, enunciado, etiqueta, tipo) => {

        const resultado = await pool.query(
            `UPDATE questao
             SET enunciado = $1, etiqueta = $2, tipo = $3
             WHERE id_questao = $4`,
            [enunciado, etiqueta || null, tipo, id_questao]
        );

        return resultado.rowCount > 0;
    },

    deletar: async (id_questao) => {
        const resultado = await pool.query(
            'DELETE FROM questao WHERE id_questao = $1',
            [id_questao]
        );

        return resultado.rowCount > 0;
    }

};

const inserirAlternativas = async (client, id_questao, dadosAlternativas) => {
    const alternativasInseridas = [];
    for (const alternativa of dadosAlternativas) {
        const resultado = await client.query(
            `INSERT INTO alternativa (id_questao, ordem_alternativa, texto, correta)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [id_questao, alternativa.ordem, alternativa.texto, alternativa.correta]
        );
        alternativasInseridas.push(resultado.rows[0]);
    }
    return alternativasInseridas;
};

module.exports = QuestaoRepositorio;
