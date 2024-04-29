import './login.css';

import { React, Link } from 'react';

// Importando Assets
import imgLogin from '../../img/imgLogin.png';

function Login({goToContatos, goToSignUp, goToForgotPassword }) {
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
          <input className='inputEmail' type='text'></input>
        </div>
        <div className='senha'>
          <p>Senha</p>
          <input className='inputSenha' type='password'></input>
        </div>
        <p className='esquecerSenha'>Esqueceu a sua senha? <label className='esquecerSenha_link' onClick={goToForgotPassword}>Clique aqui</label></p>
        <button className='btnLogin' onClick={goToContatos} >Login</button>
        <p className='cliqueCadastrar'>Não tem uma conta? <label className='cliqueCadastrar_link' onClick={goToSignUp}>Cadastre-se agora</label></p>
      </div>
    </div>
  );
}

export default Login;
