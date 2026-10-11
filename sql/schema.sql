DROP TABLE IF EXISTS resultado;
DROP TABLE IF EXISTS quiz_questao;
DROP TABLE IF EXISTS alternativa;
DROP TABLE IF EXISTS quiz;
DROP TABLE IF EXISTS questao;
DROP TABLE IF EXISTS aluno;
DROP TABLE IF EXISTS docente;
DROP TABLE IF EXISTS usuario;  


CREATE TABLE usuario (
    nome_completo VARCHAR(150) NOT NULL,
    nome_usuario  VARCHAR(150) NOT NULL PRIMARY KEY,
    email         VARCHAR(150) NOT NULL UNIQUE,
    senha         VARCHAR(255) NOT NULL,
    role          VARCHAR(20)  NOT NULL CHECK (role IN ('aluno', 'docente', 'admin'))
);

CREATE INDEX usuario_role_index ON usuario (role);

CREATE TABLE quiz (
    id_quiz             SERIAL NOT NULL PRIMARY KEY,
    id_docente          VARCHAR(150) NOT NULL,
    disciplina          VARCHAR(100) NOT NULL,
    quantidade_questoes INT NOT NULL,
    CONSTRAINT quiz_id_docente_foreign FOREIGN KEY (id_docente) REFERENCES usuario (nome_usuario)
);

CREATE INDEX quiz_docente_index ON quiz (id_docente);
CREATE INDEX quiz_disciplina_index ON quiz (disciplina);

CREATE TABLE questao (
    id_questao SERIAL NOT NULL PRIMARY KEY,
    id_docente VARCHAR(150) NOT NULL,
    enunciado  TEXT NOT NULL,
    etiqueta   VARCHAR(100) NULL,
    tipo       VARCHAR(20) NOT NULL CHECK (tipo IN ('multipla_escolha', 'verdadeiro_falso')),
    CONSTRAINT questao_id_docente_foreign FOREIGN KEY (id_docente) REFERENCES usuario (nome_usuario)
);
CREATE INDEX questao_docente_index ON questao (id_docente);
CREATE INDEX questao_etiqueta_index ON questao (etiqueta);
CREATE INDEX questao_tipo_index ON questao (tipo);

CREATE TABLE alternativa (
    id_questao        SERIAL NOT NULL,
    ordem_alternativa INT NOT NULL,
    texto             VARCHAR(255) NOT NULL,
    correta           BOOLEAN NOT NULL,
    PRIMARY KEY (id_questao, ordem_alternativa),
    CONSTRAINT alternativa_id_questao_foreign FOREIGN KEY (id_questao) REFERENCES questao (id_questao) ON DELETE CASCADE
);

CREATE INDEX alternativa_questao_index ON alternativa (id_questao);

CREATE TABLE quiz_questao (
    id_quiz    SERIAL NOT NULL,
    id_questao SERIAL NOT NULL,
    PRIMARY KEY (id_quiz, id_questao),
    CONSTRAINT quiz_questao_id_quiz_foreign FOREIGN KEY (id_quiz) REFERENCES quiz (id_quiz) ON DELETE CASCADE,
    CONSTRAINT quiz_questao_id_questao_foreign FOREIGN KEY (id_questao) REFERENCES questao (id_questao) ON DELETE CASCADE
);
CREATE INDEX quiz_questao_questao_index ON quiz_questao(id_questao);

CREATE TABLE resultado (
    id_quiz         SERIAL NOT NULL,
    id_aluno        VARCHAR(150) NOT NULL,
    acertos         INT NOT NULL,
    tempo_conclusao FLOAT,
    PRIMARY KEY (id_quiz, id_aluno),
    CONSTRAINT resultado_id_aluno_foreign FOREIGN KEY (id_aluno) REFERENCES usuario (nome_usuario),
    CONSTRAINT resultado_id_quiz_foreign FOREIGN KEY (id_quiz) REFERENCES quiz (id_quiz)
);
CREATE INDEX resultado_aluno_index ON resultado(id_aluno);