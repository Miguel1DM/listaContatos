import React from 'react'

// Função para navegar páginas com ReactDom
import { Navigate } from 'react-router-dom';

import ValidateToken from '../services/validateToken'

export default function PrivateRoute({children}){
	const token = localStorage.getItem('token');
	ValidateToken(token)
	
	const user = true

	return user ? children : <Navigate to="/"/>
}