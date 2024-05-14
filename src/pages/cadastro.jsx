import '../styles/cadastro.css';

// Módulos do React
import React, { useState } from 'react';

// Assets
import imgLogin from '../img/imgLogin.png';

// Componentes e Funções
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Cadastrar({goToVerificar}){
    const navigate = useNavigate();

    const handleCadastro = () => {

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const senhaConfirmacao = document.getElementById("senhaConfirmacao").value;

        if(!nome || !email || !senha || !senhaConfirmacao){
            return document.getElementById("log").innerText = "Preencha todos os campos!!";
        }

        if(senha !== senhaConfirmacao){
            return document.getElementById("log").innerText = "Senhas não são iguais!!";
        }else{
            document.getElementById("log").innerText = "";
        }

        const usuario = {
            nome: `${nome}`,
            email: `${email}`,
            senha: `${senha}`
        }

        const PostUsuario = async() => {
            const url = process.env.REACT_APP_API;
            const response = await axios.post(`${url}/novoUsuario`,usuario)
            if(response.data.error === "Email ja cadastrado"){
                return document.getElementById("log").innerText = "Email já cadastrado!!";
            }
            navigate("/verificacao")        
        }

        PostUsuario()
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
                <p id="log"></p>
                <button 
                    type="button" 
                    className='btnCadastro'
                    onClick={handleCadastro}
                    >
                    Cadastrar
                </button>
            </div>
        </div>
    );
}

export default Cadastrar;