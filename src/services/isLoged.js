// Importando Bibliotecas
import React from 'react';
import jwt from 'jsonwebtoken';

export default function isLoged(){
	const token = localStorage.getItem('token');
	if(!token){
		console.log("Token não encontrado")
		return false;
	}
	else{
		console.log(token)
		// const decodedToken = jwt.verify(token,"TECHFORCEMIGUELRAFAELJOAOVINICIUMVINICIUSGOESSCALCINHAPRETA")
		// Exibindo conteúdo do token 
		// console.log(decodedToken);
	}
}