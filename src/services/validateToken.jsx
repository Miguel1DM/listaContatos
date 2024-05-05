import {jwtDecode} from 'jwt-decode';

function ValidateToken(token){
	const decodificacao = jwtDecode(token)
	console.log(decodificacao)
}

export default ValidateToken;