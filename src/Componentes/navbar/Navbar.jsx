import { Link } from 'react-router-dom'

export default function Navbar({children}){
	return(
		<header>
			<h1>Lista de Contatos</h1>
			<Link to="/">Sair</Link>
		</header>
	)
}