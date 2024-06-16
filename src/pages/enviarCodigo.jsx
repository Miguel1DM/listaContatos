import React, {useState} from 'react';
import '../styles/enviarCd.css';

import reenviarCodigo from '../services/novoCodigo'

import { useNavigate } from 'react-router-dom';

function EnviarCodigo(){

    const navigate = useNavigate();

    const [msgErro, setMsgErro] = useState("");
    const [isLoading, setIsLoading] = useState("");

    const mensagensErro = {
        campoVazio: 'Preencha todos os campos para prosseguir',
        emailInvalido: 'E-mail inválido, deve conter um @'
    }

    async function enviarCd (){

        setIsLoading(true)

        let email = document.getElementById('email').value

        if(!email){
            setIsLoading(false)
            return(setMsgErro('campoVazio'))
        }

        if (!email.includes('@')) {
            setIsLoading(false);
            setMsgErro('emailInvalido');
            return;
        }

        localStorage.setItem('email', email)
        reenviarCodigo(email)
                navigate('/novaSenha')
        

        setIsLoading(false)
    }

    return(
        <div className='fundoRedefinir'>

                <div className='elementosRedefinir'>
                        <h1>Contact Post</h1>
                        <p className='subtitulo'>Informe o E-mail para redefinir enviar o Código de verificação</p>
                    <div className='email'>
                        <p>E-mail</p>
                        <input className='inputEmail' type='text' placeholder='E-mail' id='email'></input>
                    </div>

                    {msgErro &&(
                        <p className='texto-erro'>{mensagensErro[msgErro]}</p>
                    )}
                    
                    <button className='btnEnviar_link' onClick={enviarCd} disabled={isLoading}>{isLoading ? 'Enviando...' : 'Enviar'}</button>

                    

                </div>
        </div>
    );
}

export default EnviarCodigo;