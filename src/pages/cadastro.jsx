import '../styles/cadastro.css';

// Módulos do React
import React, {useState} from 'react';

// Assets
import imgLogin from '../img/imgLogin.png';

import cadastro from '../services/cadastro';
// Componentes e Funções

import { Link, useNavigate } from 'react-router-dom';

function Cadastrar(){

    const [isLoading, setIsLoading] = useState("");

    const navigate = useNavigate();

    function handleCadastro () {

        document.getElementById("log").innerText = "";

        setIsLoading(true)

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const senhaConfirmacao = document.getElementById("senhaConfirmacao").value;
        const emailConfirmado = document.getElementById('confirmarEmail').value;

        if(!nome || !email || !senha || !senhaConfirmacao){
            setIsLoading(false)
            return document.getElementById("log").innerText = "Preencha todos os campos!!";
        }

        if(senha !== senhaConfirmacao){
            setIsLoading(false)
            return document.getElementById("log").innerText = "Senhas não são iguais!!";
        }else if(email !== emailConfirmado){
            setIsLoading(false)
            return document.getElementById("log").innerText = "Os E-mails não são iguais";
        }else if(!email.includes('@')){
            setIsLoading(false)
            return document.getElementById("log").innerText = 'E-mail(s) inválidos, devem conter um @';
        }
    
        document.getElementById("log").innerText = "";
        cadastro(nome, email, senha).then(resposta => {
            if(resposta.validacao === true){
                localStorage.setItem('email', email)
                navigate('/verificacao')
            }else{
                setIsLoading(false)
                return document.getElementById("log").innerText = "Email ja cadastrado";
            }
        })
        setIsLoading(false)
    }

    return(
        <div className='fundoCadastro'>
            <img src={imgLogin} alt='imgLogin'></img>
            <div className='elementosCadastro'>
                <h1>Contact Post</h1>
                <p className='subtitulo'>Faça seu cadastro para criar suas listas de contatos</p>
                <div className='nome'>
                    <p>Nome Completo</p>
                    <input 
                        id="nome" 
                        type='text'></input>
                </div>
                <div className='email'>
                    <p>E-mail</p>
                    <input 
                        id="email" 
                        type='text'></input>
                </div>
                <div className='email'>
                    <p>Confirmar E-mail</p>
                    <input 
                        id="confirmarEmail" 
                        type='text'></input>
                </div>
                <div className='senha'>
                    <p>Senha</p>
                    <input 
                        id="senha" 
                        type='password'></input>
                </div>
                <div className='confirmarSenha'>
                    <p>Confirmar Senha</p>
                    <input 
                        id="senhaConfirmacao" 
                        type='password'></input>
                </div>
                <p id="log" className='texto-erro'></p>
                <button 
                    type="button" 
                    className='btnCadastro'
                    onClick={handleCadastro}
                    disabled={isLoading}
                    >
                    {isLoading ? "Carregando..." : "Cadastrar"}
                </button>
                <p>Ja tem conta realize o {<Link to="/" className="link1">Login</Link>}</p>
            </div>
        </div>
    );
}

export default Cadastrar;