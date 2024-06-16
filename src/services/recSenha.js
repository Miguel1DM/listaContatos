async function recSenha(email, senha, cdVerificacao) {
    const dados = {
        email: email,
        senha: senha,
        codigoVerificacao: cdVerificacao
    };

    const options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(dados) 
    };
    
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/recuperarSenha`, options);
        const resposta = await response.json();
        let status = resposta.result[0].status;

        if (status === "codigo Errado") {
            status = false;
            
        }else{
            localStorage.setItem('email', " ");
            status = true
        }
        
        return {
            status: status
        };

    } catch (error) {
        console.error('erro recSenha \n', error);
        return null;
    }
}

export default recSenha;