import React from 'react'
import { Navigate } from 'react-router-dom';  
import axios from 'axios'

// Função de Autenticação de Login
async function AuthLogin(email,senha){

  // Validando campos a ser inseridos 
  if(!email || !senha){
    return window.alert("Insira o Nome e a Senha do Usuário!!")
  }
  else{
    const url = process.env.REACT_APP_API;
    const data = {
      "email": `${email}`,
      "senha": `${senha}`
    }

    // Busca o email e senha do usuário na API
    window.alert("Realizando Login...");
    const response = await axios.post(`${url}/login`,data)
      if(response.status === 200){
        const statusLogin = response.data.result[0].statusLogin
        if(statusLogin){
          // Salvando Token no localStorage
          const token = response.data.result[0].token;
          localStorage.setItem("token",`${token}`)
          return true
        }else{
          window.alert("Email ou Senha Incorretos!!")
          return <Navigate to="/"/>
        }
      }else{
        window.alert("Erro ao buscar Usuário.")
        return false
      }
  }
}

export default AuthLogin;