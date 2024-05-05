import '../styles/login.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Importando Assets
import imgLogin from '../img/imgLogin.png';

import AuthUser from '../services/authUser';

export default function Login() {
  const navigate = useNavigate();

  async function clickLogin(){
    const email = document.getElementById("inputEmail").value;
    const senha = document.getElementById("inputSenha").value;

    await AuthUser(email,senha);
    navigate("/listacontatos")
  }

  return (
    <div className='fundoLogin'>
      <div className='imgLogin'>
        <img src={imgLogin} alt='imgLogin'></img>
      </div>

      <div className='elementosLogin'>
        <h1>Contact Post</h1>
        <p className='subtitulo'>Faça login para acessar sua lista de contatos</p>
        <div className='email'>
          <p>E-mail</p>
          <input id="inputEmail" className='inputEmail' type='text'></input>
        </div>
        <div className='senha'>
          <p>Senha</p>
          <input id="inputSenha" className='inputSenha' type='password'></input>
        </div>
        <p className='esquecerSenha'>Esqueceu a sua senha? <Link to="/novasenha" className='esquecerSenha_link'>Clique aqui</Link></p>
        <button onClick={clickLogin} className='btnLogin'>Login</button>
        <p id="res"></p>
        <p className='cliqueCadastrar'>Não tem uma conta? <Link to="/cadastro" className='cliqueCadastrar_link'>Cadastre-se agora</Link></p>
      </div>
    </div>
  );
}
