// Importando Funções E Componentes
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Importando Páginas
import Login from '../pages/login'
import ListaContatos from '../pages/listaContatos'
import Cadastro from '../pages/cadastro'
import Verificacao from '../pages/verificacao' 
import EnviarCodigo from '../pages/enviarCodigo.jsx'
import NovaSenha from '../pages/nova_senha.jsx'

import PrivateRoute from '../routes/privateRoute.jsx'

export function Rotas(){
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login/>} />
				<Route path="/listacontatos" element={<PrivateRoute><ListaContatos/></PrivateRoute>} />
				<Route path="/cadastro" element={<Cadastro/>} />
				<Route path="/verificacao" element={<Verificacao/>} />
				<Route path="/enviarCodigo" element={<EnviarCodigo/>} />
				<Route path="/novaSenha" element={<NovaSenha/>} />
			</Routes>
		</BrowserRouter>
	)
}