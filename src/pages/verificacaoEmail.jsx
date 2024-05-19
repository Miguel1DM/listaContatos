import '../styles/verificacao.css';

// Importando React libs
import React from 'react';

// Importando Funções/Componentes
import { useNavigate } from 'react-router-dom';

function VerificacaoEmail(){
    const navigate = useNavigate();

    const handleEmail = () => {
        const email = document.getElementById("email").value
        const log = document.getElementById("log")

        if(!email){
            log.innerText = "Insira um email."
        }
        
        localStorage.setItem("email",`${email}`)
        return navigate("/verificacao")        
    }

    return(
            <div className='fundoVerificar'>
                <div className='elementosVerificar'>
                        <h1>Contact Post</h1>
                        <p className='subtitulo'>Email para ser verificado</p>
                    <div className='verificar'>
                        <p>Email</p>
                        <input id='email' className='inputCodVerificacao' type='email'></input>
                    </div>
                    <button type="button" onClick={handleEmail} className='btnProsseguir'>Prosseguir</button>
                    <p id="log"></p>
                </div>
            </div>
    );
}

export default VerificacaoEmail;