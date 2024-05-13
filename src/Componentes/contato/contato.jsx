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
    window.alert("Excluíndo Contato...")
    try{
      const response = await axios.delete(`${url}/excluirContato/${userId}`, options)
      if(response.data.result.status === "Contato excluído com sucesso"){ window.alert("Contato Excluído com Sucesso")}
    }catch(erro){
      console.log(`Erro ao excluir contato: ${erro}`)
    }

    return <Navigate to="/listacontatos"/>
  }

  return(
    <div key={props.id} className="w-75 p-3 rounded bg-primary-subtle mt-4 me-auto ms-auto d-flex align-items-center justify-content-between ">
      <h5 className="fs-12 d-flex align-items-center"><FontAwesomeIcon icon={faUser} className="m-auto me-2"/>{props.nome}</h5>
      <h5 className="fs-12 d-flex align-items-center"><FontAwesomeIcon icon={faPhone} className="m-auto me-2"/>{props.telefone}</h5>
      <h5 className="fs-12 d-flex align-items-center"><FontAwesomeIcon icon={faEnvelope} className="m-auto me-2"/>{props.email}</h5>
      <button className="bg-transparent btn" onClick={()=>{removerUser()}} ><FontAwesomeIcon icon={faTrash} className="me-2"/></button>
    </div>
  )
}