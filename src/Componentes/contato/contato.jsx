import React from 'react'

// Bibliotecas para Ícones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import GetId from '../../services/getId'

import axios from 'axios'
import { Navigate } from 'react-router-dom';

export default function Contato(props){
  
  const removerUser = async() => {
    // Parâmetros da Requisição
    const url = process.env.REACT_APP_API;
    const token = localStorage.getItem("token")
    const userId = GetId(token);
    const idContato = props.id
    const options = {  
      headers: {
        bearer: `${token}`
      },
      data: {
        "idContato": `${idContato}`
      }
    }

    // Fazer requisiçao para remover Usuário pelo Id
    document.getElementById("log").innerText = `Excluíndo Contato ${props.nome}`
    try{
      const response = await axios.delete(`${url}/excluirContato/${userId}`, options)
      const status = response.data.result[0].status
      if(status === "Contato excluído com sucesso"){
        document.getElementById("log").innerText = `Contato ${props.nome} Excluíndo`
        window.location.reload();
      }
      else{
        return document.getElementById("log").innerText = `Erro ao remover contato ${props.nome}`
      }
    }catch(erro){
      console.log(`Erro ao excluir contato: ${erro}`)
    }

    return <Navigate to="/listacontatos"/>
  }

  return(
    <div key={props.id} className="contato w-75 m-auto mb-2 p-3 rounded bg-primary-subtle d-flex align-items-center justify-content-between ml-1">
      <div className="contato-info w-90 d-flex flex-wrap align-items-center justify-content-around m-auto">
        <div className="d-flex align-items-center mt-1 w-50">
          <FontAwesomeIcon icon={faUser} className="me-2"/>
          {props.nome}
        </div>
        <div className="d-flex align-items-center mt-1 w-50">
          <FontAwesomeIcon icon={faPhone} className="me-2"/>
          {props.telefone}
        </div>
        <div className="d-flex align-items-center mt-1 w-90 m-auto text-start">
          <FontAwesomeIcon icon={faEnvelope} className="me-2"/>
          {props.email}
        </div>
      </div>
      <button className="bg-transparent btn" onClick={()=>{removerUser()}} ><FontAwesomeIcon icon={faTrash} className="me-2"/></button>
      <p id="logContato"></p>
    </div>
  )
}