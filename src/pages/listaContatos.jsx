import "../styles/listacontatos.css";

// Funções
import React, { useState, useEffect } from "react";
import GetId from "../services/getId";
import axios from "axios";

// Components
import Navbar from '../Componentes/navbar/navbar'
import FormData from '../Componentes/form/FormContato'
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
    <>
      <Navbar/>
      <FormData key="cadastro"/>
      <main className="m-auto w-45">
        {contatos && contatos.map(contato => (
              <Contato id={contato.id} nome={contato.nome} telefone={contato.telefeone} email={contato.email}/>
            )
          )
        }
      </main>
    </>
  );
}
