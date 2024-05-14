CREATE DATABASE listacontatos;

USE listacontatos;

CREATE TABLE usuario (
	id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    	nome VARCHAR(50) NOT NULL,
    	email VARCHAR(80) NOT NULL,
    	senha VARCHAR(15) NOT NULL,
    	verificacao BOOLEAN,
    	codigoVerificacao SMALLINT(5)
);

CREATE TABLE contato(
	id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    	nome VARCHAR(20) NOT NULL,
    	endereco VARCHAR(100) NOT NULL,
    	telefone VARCHAR(20) NOT NULL,
    	email VARCHAR(80) NOT NULL,
    	idUsuario SMALLINT NOT NULL,
    	FOREIGN KEY (idUsuario) REFERENCES usuario(id) 
);

