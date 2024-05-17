import '../styles/verificacao.css';

import React from 'react';

// Componentes e Funções
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Verificacao(){
    const navigate = useNavigate();

    const email = localStorage.getItem("email");
    const codigoInput = document.getElementById("codigoVerificacao");
    const codigo = codigoInput.value;
    
    const handleVerificar= ()=>{
        console.log(codigoInput)
    }

    const corpo = {
        email: `${email}`,
        codigoVerificacao: `${codigoInput}`
    }

    const emailCodeVerificate = async() => {
        const url = process.env.REACT_APP_API;
        const response = await axios.post(`${url}/validarEmail`,corpo)
        if(response.data.result[0].status === "Código de verificação incorreto"){
            return document.getElementById("log").innerText = "Código Inválido";
        }
        localStorage.removeItem("email")
        navigate("/listacontatos")        
    }

    return(
            <div className='fundoVerificar'>
                <div className='elementosVerificar'>
                        <h1>Contact Post</h1>
                        <p className='subtitulo'>Um código de verificação foi enviado para o seu E-mail</p>
                    <div className='verificar'>
                        <p>Código de Verificação</p>
                        <input id='codigoVerificacao' onChange={handleVerificar} className='inputCodVerificacao' type='text'></input>
                    </div>
                    <button className='btnProsseguir' onClick={emailCodeVerificate}>Prosseguir</button>
                    <p id="log"></p>
                </div>
            </div>
    );
}

export default Verificacao;