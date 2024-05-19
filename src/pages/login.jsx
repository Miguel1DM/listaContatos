import '../styles/login.css';

// Módulos React
import React, { useEffect } from 'react';

// Importando Assets
import imgLogin from '../img/imgLogin.png';

// Importando Componentes e Funções
import axios from 'axios';
import AuthUser from '../services/authUser';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  // Validando se existe Token de Login
  useEffect(()=>{
    const validateToken = async() => {
      const url = process.env.REACT_APP_API;
      const token = localStorage.getItem("token");
      if(!token){return console.log("Token não encontrado")}
      const header = {
        headers: {
          'bearer': `${token}`
        }
      }
      const response = await axios.post(`${url}/validarToken`,{},header)
      const status = response.data.status   
      if(status === true){navigate("/listacontatos")}
      else{return console.log("token inválido")}
    }

    validateToken() 
  },[navigate])

  async function clickLogin(){
    const email = document.getElementById("inputEmail").value;
    const senha = document.getElementById("inputSenha").value;

    if(await AuthUser(email,senha)){navigate("/listacontatos")}
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
        {/*<p className='esquecerSenha'>Esqueceu a sua senha? <Link to="/novasenha" className='esquecerSenha_link'>Clique aqui</Link></p>*/}
        <button onClick={clickLogin} className='btnLogin'>Login</button>
        <p id="res"></p>
        <p className='cliqueCadastrar'>Não tem uma conta? <Link to="/cadastro" className='cliqueCadastrar_link'>Cadastre-se agora</Link></p>
      </div>
    </div>
  );
}
