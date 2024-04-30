import './login.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Importando Assets
import imgLogin from '../../img/imgLogin.png';

// Biblioteca para fazer requisições
import axios from 'axios'

export default function Login() {

  // Função de Autenticação de Login
  async function AuthLogin(){
    const navigate = useNavigate();

    const email = document.getElementById("inputEmail").value
    const senha = document.getElementById("inputSenha").value
    let res = document.getElementById("res")
    res.innerHTML = "";

    // Validando campos a ser inseridos 
    if(!email || !senha){
      res.innerHTML = "Insira um Email e senha.";
    }else{
      const data = {
        "email": `${email}`,
        "senha": `${senha}`
      }
  
      // Busca o email e senha do usuário na API
      const response = await axios.post("https://apicontato.onrender.com/login",data)
        if(response.status === 200){
          const statusLogin = response.data.result[0].statusLogin
          if(statusLogin){
            // Salvando Token no localStorage
            const token = response.data.result[0].token;
            localStorage.setItem("token",`${token}`)

            res.innerHTML = "Realizando Login..."
            navigate('/listacontatos');
          }else{
            res.innerHTML = "Email ou Senha incorretos..."
          }
        }else{
          res.innerHTML = "Erro ao buscar Usuário."
        }
    }
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
        <button onClick={AuthLogin} className='btnLogin'>Login</button>
        <p id="res"></p>
        <p className='cliqueCadastrar'>Não tem uma conta? <Link to="/cadastro" className='cliqueCadastrar_link'>Cadastre-se agora</Link></p>
      </div>
    </div>
  );
}
