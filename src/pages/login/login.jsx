import './login.css';

// Componentes do React
import { React, Link } from 'react';

// Importando Assets
import imgLogin from '../../img/imgLogin.png';

function Login() {
  function authenticarUsuario(){
    console.log("Fazendo Login!!")
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
          <input className='inputEmail' type='text'></input>
        </div>
        <div className='senha'>
          <p>Senha</p>
          <input className='inputSenha' type='password'></input>
        </div>
        <p className='esquecerSenha'>Esqueceu a sua senha? <Link to="/nova_senha" className='esquecerSenha_link'>Clique aqui</Link></p>
        <Link to="/listacontatos" className='btnLogin' onClick={authenticarUsuario}>Login</Link>
        <p className='cliqueCadastrar'>Não tem uma conta? <Link to="/cadstro" className='cliqueCadastrar_link'>Cadastre-se agora</Link></p>
      </div>
    </div>
  );
}

export default Login;
