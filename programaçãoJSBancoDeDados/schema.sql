
CREATE TABLE docente (
    nome_completo VARCHAR(150) NOT NULL,
    nome_usuario VARCHAR(150) NOT NULL UNIQUE PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);



CREATE TABLE aluno (
    nome_completo VARCHAR(150) NOT NULL,
    nome_usuario VARCHAR(150) NOT NULL UNIQUE PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);


CREATE TABLE quiz (
    id_quiz SERIAL NOT NULL PRIMARY KEY,
    id_docente VARCHAR(150) NOT NULL,
    disciplina VARCHAR(100) NOT NULL,
    quantidade_questoes INT NOT NULL,
    CONSTRAINT quiz_id_docente_foreign FOREIGN KEY (id_docente) REFERENCES docente (nome_usuario)
);

CREATE INDEX quiz_disciplina_index ON quiz (disciplina);

SELECT * FROM quiz;


CREATE TABLE questao (
    id_questao SERIAL NOT NULL PRIMARY KEY,
    id_docente VARCHAR(150) NOT NULL,
    enunciado TEXT NOT NULL,
    etiqueta VARCHAR(100) NULL,
    tipo INT NOT NULL,
    CONSTRAINT questao_id_docente_foreign FOREIGN KEY (id_docente) REFERENCES docente (nome_usuario)
);

SELECT * FROM questao;

CREATE TABLE alternativa (
    id_questao SERIAL NOT NULL,
    ordem_alternativa INT NOT NULL,
    texto VARCHAR(255) NOT NULL,
    correta BOOLEAN NOT NULL,
    PRIMARY KEY (id_questao, ordem_alternativa),
    CONSTRAINT alternativa_id_questao_foreign FOREIGN KEY (id_questao) REFERENCES questao (id_questao) ON DELETE CASCADE
);

SELECT * FROM alternativa

CREATE TABLE quiz_questao (
    id_quiz SERIAL NOT NULL,
    id_questao SERIAL NOT NULL,
    PRIMARY KEY (id_quiz, id_questao),
    CONSTRAINT quiz_questao_id_quiz_foreign FOREIGN KEY (id_quiz) REFERENCES quiz (id_quiz) ON DELETE CASCADE,
    CONSTRAINT quiz_questao_id_questao_foreign FOREIGN KEY (id_questao) REFERENCES questao (id_questao) ON DELETE CASCADE
);
select * from quiz_questao;

CREATE TABLE resultado (
    id_quiz SERIAL NOT NULL,
    id_aluno VARCHAR(150) NOT NULL,
    acertos INT NOT NULL,
	tempo_conclusao FLOAT,
    PRIMARY KEY (id_quiz, id_aluno),
    CONSTRAINT resultado_id_aluno_foreign FOREIGN KEY (id_aluno) REFERENCES aluno (nome_usuario),
    CONSTRAINT resultado_id_quiz_foreign FOREIGN KEY (id_quiz) REFERENCES quiz (id_quiz)
);

SELECT * FROM aluno