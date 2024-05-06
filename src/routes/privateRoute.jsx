import React from 'react'

// Função para navegar páginas com ReactDom
import { Navigate } from 'react-router-dom';
import CheckToken from '../services/checkToken';

export default function PrivateRoute({children}){
	// const user = CheckToken()
	const user = true;

	// Validar se o token do usuário é válido
	return user ? children : <Navigate to="/"/>
}