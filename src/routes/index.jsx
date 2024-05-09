// Importando Funções para manipular Rotas
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Importando Páginas
import Login from '../pages/login'
import ListaContatos from '../pages/listaContatos'
import NovaSenha from '../pages/cadastro'

import PrivateRoute from '../routes/privateRoute.jsx'

export function Rotas(){
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login/>}/>
				<Route path="/listacontatos" element={<PrivateRoute><ListaContatos/></PrivateRoute>} />
				<Route path="/novasenha" element={<ListaContatos/>} />
			</Routes>
		</BrowserRouter>
	)
}