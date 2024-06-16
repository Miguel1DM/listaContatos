import {jwtDecode} from 'jwt-decode';

function GetId(token){
	const decodificacao = jwtDecode(token)
	const userId = decodificacao.userId;
	return userId
}

export default GetId;