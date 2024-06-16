async function reenviarCodigo (email) {

    const dados = {
        email: email,
    };

    const options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(dados) 
    };
    
    try {
        
        const response = await fetch(`${process.env.REACT_APP_API}/novoCodigo`, options);
        const resposta = await response.json();
        let validacao;
        
        if(resposta.result.status === "Código redefinido com sucesso"){
            validacao = true;
            localStorage.setItem('email', email)
        }else{
            validacao = false;
        }
        return {
            validacao: validacao,
        };

    } catch (error) {
        console.error('erro cadastro \n', error);
        return null;
    }

}


export default reenviarCodigo