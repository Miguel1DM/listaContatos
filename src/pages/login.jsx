import '../styles/login.css';

// Módulos React
import React, { useState} from 'react';

// Importando Assets
import imgLogin from '../img/imgLogin.png';

// Importando Componentes e Funções
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import login from '../services/login.js';
import reenviarCodigo from '../services/novoCodigo.js';

export default function Login() {

    // Estado para tratar o tempo de requisição
  const [isLoading, setIsLoading] = useState(false);

  const [erroMsg, setErroMsg] = useState(false);

  const msgErros = {
    loginErrado: "E-mail ou senha incorretos. Por favor, tente novamente.",
    campoVazio: "Preencha todos os campos",
    emailNaoVerificado: "Por favor, verifique seu e-mail para concluir o processo de registro, e assim poder realizar o login."
  }
  const navigate = useNavigate();

  async function clickLogin(){

    setErroMsg(false)
    setIsLoading(true);

    const email = document.getElementById("inputEmail").value;
    const senha = document.getElementById("inputSenha").value;

    if(!email || !senha){
      setErroMsg('campoVazio')
      setIsLoading(false);
      return(null);
    }
    login(email, senha).then(resposta => {
      if(resposta.statusLogin === false){
        setErroMsg('loginErrado')
        setIsLoading(false);
        return(null);
      }else if(resposta.statusLogin === "Email não verificado"){
        reenviarCodigo(email)
        navigate('/verificacao')
        return(null);
      }
    })

    setIsLoading(false);
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
        <button onClick={clickLogin} className='btnLogin' disabled={isLoading}>{isLoading ? "Carregando..." : "Login"}</button>
        {erroMsg && (
          <p className='texto-erro'>{msgErros[erroMsg]}</p>
        )}
        <p className='texto-link'>Não tem uma conta? <Link to="/cadastro" className='cliqueCadastrar_link'>Cadastre-se agora</Link></p>
        <p className='texto-link'><Link to="/enviarCodigo" className='cliqueCadastrar_link'>Esqueceu senha?</Link></p>
      </div>
    </div>
  );
}
