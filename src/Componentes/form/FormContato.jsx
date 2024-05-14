import { useState } from 'react'

// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import axios from 'axios';
import GetId from '../../services/getId.jsx'

export default function FormContato(){
	const [contato, setContato] = useState({})

  function definirNome(event) {
    setContato({ ...contato, nome: event.target.value })
  }

  function definirTelefone(event) {
    setContato({ ...contato, telefone: event.target.value })
  }

  function definirEmail(event) {
    setContato({ ...contato, email: event.target.value })
  }

  function submit(){
    // Validando campos vazios
    if(!contato.nome || !contato.telefone || !contato.email){
      return document.getElementById("log").innerText = 'Você não preencheu todos campos!!'
    }

    // Parâmetros para requisição
    const url = process.env.REACT_APP_API;
    const token = localStorage.getItem("token");
    const userId = GetId(token);
    const headers  ={
      headers: {
        "bearer": `${token}`,
      } 
    }
    const body = {
      nome: `${contato.nome}`,
      email: `${contato.email}`,
      telefone: `${contato.telefone}`,
      endereco: 'null'
    }

    // Função que adiciona contato
    const postContato = async() => {
      document.getElementById("log").innerText = 'Inserindo contato...'
      try{
        const response = await axios.post(`${url}/novoContato/${userId}`, body, headers);
        const status = response.data.result[0].status
        if(status === "Adicionado com sucesso"){
          document.getElementById("log").innerText = 'Contato Inserído com sucesso.'  
          window.location.reload();
        }else{
          console.log(response)
        }
        
      }catch(e){
        document.getElementById("log").innerText = 'Ocorreu um erro ao tentar adicionar um Contato.'
      }
    }
         
    postContato()
  }

	return(
		<form onSubmit={submit} className="formContact w-35">
        <div className="mb-3">
          <label className="form-label fw-medium fs-5">Nome</label>
          <input
            id="nome"
            type="text"
            onChange={definirNome}
            value={contato.nome}
            className="form-control fw-medium fs-7"
          />
        </div>
        <div>
          <label className="form-label fw-medium fs-5">Telefone</label>
          {/* Adicionar estado de clicar enter "onKeyUp={enterAdicionarContato}" */}
          <input
            type="text"
            id="telefone"
            onChange={definirTelefone}
            value={contato.telefone}
            className="form-control fw-medium fs-7"
          />
        </div>
        <div>
          <label className="form-label fw-medium fs-5">Email</label>
          {/* Adicionar estado de clicar enter "onKeyUp={enterAdicionarContato}" */}
          <input
            type="text"
            id="email"
            onChange={definirEmail}
            value={contato.email}
            className="form-control fw-medium fs-7"
          />
        </div>
        <p className="fs-6 mt-2 fw-bolder text-center" id="log"></p>
        <button type="button" onClick={submit} className="btn btn-primary mt-4"><FontAwesomeIcon icon={faCirclePlus} className="me-2" />Adicionar</button>
      </form>
	)
}