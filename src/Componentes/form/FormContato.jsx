import { useState } from 'react'

// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function FormContato(){
	const [contato, setContato] = useState({})

	return(
		<form onSubmit={submit} className="formContact">
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            id="nome"
            type="text"
            // onChange={handleName()}
            value={contato.nome}
            className="form-control"
          />
        </div>
        <div>
          <label className="form-label">Telefone</label>
          {/* Adicionar estado de clicar enter "onKeyUp={enterAdicionarContato}" */}
          <input
            type="text"
            id="telefone"
            // onChange={handlePhone()}
            value={contato.telefone}
            className="form-control"
          />
        </div>
        <div>
          <label className="form-label">Email</label>
          {/* Adicionar estado de clicar enter "onKeyUp={enterAdicionarContato}" */}
          <input
            type="text"
            id="email"
            // onChange={handleMail()}
            value={contato.email}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4"><FontAwesomeIcon icon={faCirclePlus} className="me-2" />Adicionar</button>
      </form>
	)
}