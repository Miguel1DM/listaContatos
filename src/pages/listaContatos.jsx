import "../styles/listacontatos.css";

// Funções
import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import GetId from "../services/getId";
import axios from "axios";

// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faList,
} from "@fortawesome/free-solid-svg-icons";

// Components
// import Contato from "../componentes/contato/contato";

export default function ListaContatos(){
  const [contatos, setContatos] = useState([]);

  // useEffect(() => {
  //   // Paramêtros da Requisição
  //   const url = process.env.REACT_APP_API;
  //   const token = localStorage.getItem("token");
  //   const userId = GetId(token);

  //   // Função para buscar e salvar Todos contatos
  //   const buscarContatos = async () => {
  //     const url = `${url}contatos/${userId}`;
  //     const response = await axios.get(url, {
  //       headers: {
  //         "x-access-token": `${token}`,
  //       }
  //     });

  //     // Tratamento do token do Usuário
  //     if(response.result.status === "você nao passou o token"){ window.alert("Faça login primeiro!!"); <Navigate to="/"/>}
  //     else if(response.result[0].status === "O token expirou"){ window.alert("Faça login novamente, sua sessão expirou!!"); <Navigate to="/"/>}
  //     // Salvando Lista de contatos
  //     else if(response.result != []){setContatos(response.result)}
  //   };   
     
  //   buscarContatos()
  // }, []);


  return (
    <div className="mx-2">
      <h2 className="text-center mt-3"><FontAwesomeIcon icon={faList} className="me-3" />Contact Post</h2>
      <form action="" className="formContact">
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            //onChange={changeInputNome}
            // value={contato.nome}
            className="form-control"
          />
        </div>
        <div>
          <label className="form-label">Telefone</label>
          {/* Adicionar estado de clicar enter "onKeyUp={enterAdicionarContato}" */}
          <input
            type="text"
            // onChange={changeInputTelefone}
            // value={contato.telefone}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary mt-4" ><FontAwesomeIcon icon={faCirclePlus} className="me-2" />Adicionar</button>
      </form>
      <ul>
      {/* {contatos.map(contato => (
          <Contato id={contato.id} nome={contato.nome} numero={contato.numero} email={contato.email}/>
        ))} */}
      </ul>
    </div>
  );
}
