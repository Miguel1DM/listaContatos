import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}){
	// Validando Token do Usuário para prosseguir na página
	const user = true;

	// Validar se o token do usuário é válido
	return user ? children : <Navigate to="/"/>
}