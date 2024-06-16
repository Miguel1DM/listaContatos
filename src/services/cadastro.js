async function cadastro (nome, email, senha) {

    const dados = {
        nome: nome,
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
        const response = await fetch(`${process.env.REACT_APP_API}/novoUsuario`, options);
        const cadastro = await response.json();

        let validacao = true;
        
        if(cadastro.result.status === "Cadastro feito"){
            localStorage.setItem('email', email);
    
        }else if(cadastro.error === "Email ja cadastrado"){
            validacao = false;
        }

        let email2 = email;

        return {
            validacao: validacao,
            email: email2,
        };

    } catch (error) {
        console.error('erro cadastro \n', error);
        return null;
    }

}


export default cadastro