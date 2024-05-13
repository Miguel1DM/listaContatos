import './navbar.css'

// Componentes
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Assets
import {  faList,faSignOutAlt  } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({children}){
	const removeToken = () => {
		localStorage.removeItem("token");
	}

	return(
		<header className="navbar w-100 p-5 pb-3 pt-2 d-flex font-weight-bold align-items-center justify-content-between">
			<div className="d-flex align-items-center">
				<FontAwesomeIcon icon={faList} className="me-3" size="1em" />
				<h1 className="fs-2">Lista de Contatos</h1>	
			</div>
			<div className="d-flex align-items-center">
				<Link to="/" onClick={removeToken()} className="fs-2 text-body text-decoration-none d-flex align-items-center text-center">
					Sair
					<FontAwesomeIcon icon={faSignOutAlt} className="me-3 ms-4" />
				</Link>
				
			</div>
		</header>
	)
}