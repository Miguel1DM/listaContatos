import React, { useState } from 'react';
import '../styles/nova_senha.css';
import { Link, useNavigate } from 'react-router-dom';
import recSenha from '../services/recSenha.js';
import reenviarCodigo from '../services/novoCodigo';


function NovaSenha() {

    const navigate = useNavigate();
    const [senha1, setSenha1] = useState("");
    const [senha2, setSenha2] = useState("");
    const [codigo, setCodigo] = useState("");

    const [msgErro, setMsgErro] = useState("");

    const [enviarCodigo, setEnviarCodigo] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);

    let emailLocalStorage = localStorage.getItem('email');

    async function reenviarCodigoVerificacao(){
        reenviarCodigo(emailLocalStorage)
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

    const mensagensErro = {
        campoVazio: 'Preencha todos os campos antes de prosseguir',
        senhaDiferentes: 'As senhas informadas não coincidem',
        codigoErrado: 'O código de verificação está errado'
    };

    function redefinirSenha() {
        setMsgErro("");

        if (!senha1 || !senha2 || !codigo) {
            return setMsgErro('campoVazio');
        }

        if (senha1 !== senha2) {
            return setMsgErro('senhaDiferentes');
        }

        parseInt(codigo);
        recSenha(emailLocalStorage, senha1, codigo).then(resposta => {
            if(resposta.status === false){
                return(setMsgErro('codigoErrado'))
            }
                navigate('/')
        })
        

    }

    return (
        <div className='fundoNova_senha'>
            <div className='elementosNova_senha'>
                <h1>Contact Post</h1>
                <p className='subtitulo'>
                    Um código de verificação foi enviado para o <br/>
                    email: <strong>{emailLocalStorage}</strong> <Link to="/enviarCodigo" className='link1'>Mudar email</Link>
                </p>

                <div className='nova_senha'>
                    <p>Digite o código de verificação</p>
                    <input
                        type='number'
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                </div>

                <div className='nova_senha'>
                    <p>Senha Nova</p>
                    <input
                        type='password'
                        value={senha1}
                        onChange={(e) => setSenha1(e.target.value)}
                    />
                </div>

                <div className='confirmarNova_senha'>
                    <p>Confirmar Senha Nova</p>
                    <input
                        type='password'
                        value={senha2}
                        onChange={(e) => setSenha2(e.target.value)}
                    />
                </div>

                {enviarCodigo ? (
                    <p className="texto-normal">Por favor, aguarde {timeLeft} segundos para reenviar  .</p>
                ) : (
                    <a onClick={reenviarCodigoVerificacao} className="link1">Reenviar código de vereficação</a>
                )}

                {msgErro && (
                    <p className='texto-erro'>{mensagensErro[msgErro]}</p>
                )}
                <button className='btnNova_senha' onClick={redefinirSenha}>Redefinir Senha</button>
                <p className='subtitulo'>Não tem uma conta? <Link to="/cadastro" className='link1'>Cadastre-se agora</Link></p>
            </div>
        </div>
    );
}

export default NovaSenha;