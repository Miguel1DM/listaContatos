CREATE DATABASE dbApiCarros;

USE dbApiCarros;

CREATE TABLE carros(
	id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    modelo varchar(30) NOT NULL,
    placa VARCHAR(7) NOT NULL
);

INSERT INTO carros (modelo, placa) VALUES ('creta', '1234567');

SELECT * FROM carros;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';

SELECT * FROM carros;


