async function login(email, senha) {
    const dados = {
        email: email,
        senha: senha
    };

    const options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(dados) 
    };
    
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/login`, options);
        const login = await response.json();
        let statusLogin = login.result[0].statusLogin;
        let idUsuario;
        let token;
        let nome;

        if (statusLogin === true) {

            idUsuario = (login.result[0].id);
            token = (login.result[0].token);
            nome = (login.result[0].nome);

            localStorage.setItem('idUsuario', idUsuario);
            localStorage.setItem('token', token);

        }else if(login.result[0].mensagem === "Email não verificado"){

            statusLogin = 'emailNaoVerificado'
            localStorage.setItem('email', email);

        }else{
            
            localStorage.setItem('email', email);
            statusLogin = login.result[0].statusLogin;
        }
        
        return {
            idUsuario: idUsuario,
            token: token,
            nome: nome,
            statusLogin: statusLogin
        };

    } catch (error) {
        console.error('erro login \n', error);
        return null;
    }
}

export default login;