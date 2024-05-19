import '../styles/verificacao.css';

import React, { useEffect } from 'react';

// Componentes e Funções
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Verificacao(){
    const navigate = useNavigate();



    const emailCodeVerificate = async() => {
        const codigoInput = document.getElementById("codigoVerificacao").value;
        if(!codigoInput){
            return document.getElementById("log").innerText = "Insira um código!!"
        }

        const email = localStorage.getItem("email");
        const corpo = {
            email: `${email}`,
            codigoVerificacao: `${codigoInput}`
        }



        const url = process.env.REACT_APP_API;
        document.getElementById("log").innerText = "Validando Código..."

        try{
            const response = await axios.post(`${url}/validarEmail`,corpo)
            if(response.data.result[0].status === "Código de verificação incorreto"){
                document.getElementById("log").innerText = "Código Inválido"
                return document.getElementById("log").innerText = "";
            }
        }catch(err){
            document.getElementById("log").innerText = `Erro ao validar código: ${err}`
        }

        document.getElementById("log").innerText = "Código validado com sucesso..."
        localStorage.removeItem("email")
        navigate("/")        
    }

    return(
            <div className='fundoVerificar'>
                <div className='elementosVerificar'>
                        <h1>Contact Post</h1>
                        <p className='subtitulo'>Um código de verificação foi enviado para o seu E-mail</p>
                    <div className='verificar'>
                        <p>Código de Verificação</p>
                        <input 
                            id='codigoVerificacao' 
                            className='inputCodVerificacao' 
                            type='text'>
                        </input>
                    </div>
                    <button className='btnProsseguir' onClick={emailCodeVerificate}>Prosseguir</button>
                    <p id="log"></p>
                </div>
            </div>
    );
}

export default Verificacao;