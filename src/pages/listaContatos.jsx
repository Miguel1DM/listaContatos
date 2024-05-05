import "../styles/listacontatos.css";

// Importando pacotes
import React from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Importando Ícones
import {
  faCirclePlus,
  faList,
} from "@fortawesome/free-solid-svg-icons";

export default function ListaContatos(){

  

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
        {}
      </ul>
    </div>
  );
}
