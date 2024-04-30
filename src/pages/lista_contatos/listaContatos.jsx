import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faTrashAlt,
  faUser,
  faCirclePlus,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import "./listacontatos.css";
import jwt from 'json'

// Biblioteca para fazer requisições
import axios from 'axios'

// Importando Componente de Contato
import Contato from "../../Componentes/contato/contato";

function ListaContatos(props) {
  // Busancdo lista de Usuários
  const idUsuario;
  const contacts = axios.get(`https://apicontato.onrender.com/contatos/${idUsuario}/`)
  const [setListaContatos, listaContatos] = useState([]);

  // Contato a ser adicionado
  const [contato, setContato] = useState({ id: "", nome: "", telefone: "" });

  // Funções de estado do componente a ser inserido
  function changeInputNome(event) {
    setContato({ ...contato, nome: event.target.value });
  }
  function changeInputTelefone(event) {
    setContato({ ...contato, telefone: event.target.value });
  }

  return (
    <div className="mx-2">
      <h2 className="text-center mt-3">
        <FontAwesomeIcon icon={faList} className="me-3" />
        Contact Post
      </h2>
      <form action="" className="formContact">
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            onChange={changeInputNome}
            value={contato.nome}
            className="form-control"
          />
        </div>
        <div>
          <label className="form-label">Telefone</label>
          {/* Adicionar estado de clicar enter "onKeyUp={enterAdicionarContato}" */}
          <input
            type="text"
            onChange={changeInputTelefone}
            value={contato.telefone}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary mt-4" >
          <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
          Adicionar
        </button>
      </form>
    </div>
  );
}

export default ListaContatos;
