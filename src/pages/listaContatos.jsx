import "../styles/listacontatos.css";

// Funções
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import GetId from "../services/getId";
import axios from "axios";

// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faList,
} from "@fortawesome/free-solid-svg-icons";

// Components
import Contato from "../Componentes/contato/contato";
import CheckToken from "../services/checkToken";

export default function ListaContatos(){
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = GetId(token);
    const buscarContatos = async () => {
      const url = `https://listacontatos-bicw.onrender.com/contatos/${userId}`;
      const response = await axios.get(url, {}, {
        headers: {
          'x-acess-token': userId,
        }
      });
      CheckToken(response);
      setContatos(response);
    };

    buscarContatos();
  }, []);

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
      {contatos.map(contato => (
          <Contato id={contato.id} nome={contato.nome} numero={contato.numero} email={contato.email}/>
        ))}
      </ul>
    </div>
  );
}
