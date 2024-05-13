import "../styles/listacontatos.css";

// Funções
import React, { useState, useEffect } from "react";
import GetId from "../services/getId";
import axios from "axios";

// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faList } from "@fortawesome/free-solid-svg-icons";

import FormData from '../Componentes/form/FormContato'

// Components
import Contato from "../Componentes/contato/contato";

export default function ListaContatos(){
  const [contatos, setContatos] = useState([]);
  
  useEffect(()=>{
    // Paramêtros para realizar requisições
    const url = process.env.REACT_APP_API;
    const token = localStorage.getItem("token");
    const userId = GetId(token);
    const headers  ={
      headers: {
        "bearer": `${token}`,
      } 
    }

    // Função que busca Contatos do Usuário
    const getContatos = async() => {
      const response = await axios.get(`${url}/contatos/${userId}`, headers);
      const contatos = response.data.result
      setContatos(contatos)
    }; 
    getContatos()
   },[])

  return (
    <div>
      <h2 className="text-center mt-3"><FontAwesomeIcon icon={faList} className="me-3" />Contact Post</h2>
      <FormData key="cadastro"/>
      <div className="m-auto w-75">
      {contatos.map(contato => (
          <Contato id={contato.id} nome={contato.nome} telefone={contato.telefone} email={contato.email}/>
        ))}
      </div>
    </div>
  );
}
