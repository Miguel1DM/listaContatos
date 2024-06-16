import '../styles/verificacao.css';

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import reenviarCodigo from '../services/novoCodigo';

import verificarEmail from '../services/verificacao';

function Verificacao(){

    const emailLocalStorage = localStorage.getItem('email');
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState("");
    const [msgErro, setErroMsg] = useState("");

    const [enviarCodigo, setEnviarCodigo] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);

    async function reenviarCodigoVerificacao(){
        console.log(reenviarCodigo(emailLocalStorage))
        setEnviarCodigo(true)
        setTimeLeft(60)
    
        const timer = setInterval(() => {
          setTimeLeft(prevTime => {
            if (prevTime <= 1) {
              clearInterval(timer);
              setEnviarCodigo(false);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      }

    const mensagensError = {
        campoVazio: 'Preencha todos os campo antes de prosseguir',
        codigoErrado: 'O código de verificação esta errado'
    }

    function validarEmail () {
        setIsLoading(true)

        let codigoVerificacao = parseInt(document.getElementById('codigoVerificacao').value)

        if(!codigoVerificacao){
            return(setErroMsg('campoVazio'))
        }

        verificarEmail(emailLocalStorage, codigoVerificacao).then(resposta => {
            if(resposta.validacao === false){
                setIsLoading(false)
                return(setErroMsg('codigoErrado'))
            }else{
                navigate('/')
            }
            setIsLoading(false)
        })
    }

    return(
            <div className='fundoVerificar'>
                <div className='elementosVerificar'>
                        <h1>Validar Email</h1>
                        <p className='subtitulo'>Um código de verificação foi enviado para o seu E-mail <strong>{emailLocalStorage}</strong></p>
                    <div className='verificar'>
                        <p>Código de Verificação</p>
                        <input 
                            id='codigoVerificacao' 
                            className='inputCodVerificacao' 
                            type='text'>
                        </input>
                    </div>
                    {msgErro &&(
                        <p className='texto-erro'>{mensagensError[msgErro]} </p>
                    )}

                    {enviarCodigo ? (
                        <p className="texto-normal">Por favor, aguarde {timeLeft} segundos para reenviar  .</p>
                    ) : (
                        <a onClick={reenviarCodigoVerificacao} className="link">Reenviar código de vereficação</a>
                     )}
                    <button className='btnProsseguir' onClick={validarEmail} disabled={isLoading}>{ isLoading ? "Carregando..." : "Validar"}</button>
                    <p id="log"></p>
                </div>
            </div>
    );
}

export default Verificacao;