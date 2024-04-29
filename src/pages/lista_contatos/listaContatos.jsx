import { React, useState,} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhoneVolume, faTrashAlt, faUser, faCirclePlus} from "@fortawesome/free-solid-svg-icons"
import './listacontatos.css'

// Importando Componente de Contato
import Contato from '../../Componentes/contato/contato'

function ListaContatos(props) {
    // Estados 
    const [setListaContatos, listaContatos] = useState([]);
    const [contato, setContato] = useState({ id: '', nome: '', telefone: '' });


    // Funções de estado do componente a ser inserido
    function changeInputNome(event) {
        setContato({ ...contato, nome: event.target.value })
      }
    function changeInputTelefone(event) {
        setContato({ ...contato, telefone: event.target.value })
      }
    
return (
    <div className="mx-2" id="Salada">
        <div>
            <div className="listadecontatos">
              <div className="container-fluid titulo">
                <div className="row">
                  <div className="col text-center">
                    <h2 className="text-center"><FontAwesomeIcon className="me-3" />Contact Post</h2>
                  </div>
                </div>
              </div>
              <div className="container-fluid formulario">
                <div className="row">
                  <div className="col p-3">
                    <div className="row justify-content-center">
                      <div className="col-10 col-sm-8 col-md-6 col-lg-4 ">
                        <div className="mb-3">
                          <label className="form-label">Nome</label><br />
                          <input type="text" onChange={changeInputNome} value={contato.nome} className="form-control" />
                        </div>
                        <div>
                          <label className="form-label">Telefone</label><br />
                          {/* Adicionar estado de clicar enter "onKeyUp={enterAdicionarContato}" */}
                          <input type="text" onChange={changeInputTelefone} value={contato.telefone} className="form-control" />
                        </div>
                        <div className="row mt-3">
                          <div className="col text-end">
                            {/* Adicionar serviço para adicionar Contato  */}
                            <button className="btn btn-outline-primary">
                              <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
                              Adicionar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ul>
                      {/* {listaContatos.map(ct => {
                        // Adicionar serviço para remover contato pelo ID "remover={removerContato}"
                        return <Contato key={ct.id} id={ct.id} nome={ct.nome} telefone={ct.telefone} />
                      })} */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="container componente-contato my-4">
            <div className="row">
                <div className="col p-2">
                    <h4>
                        <FontAwesomeIcon icon={faUser} className="me-3"></FontAwesomeIcon>
                        {props.nome}
                    </h4>
                </div>
                <div className="col p-2">
                    <h4>
                        <FontAwesomeIcon icon={faPhoneVolume} className="me-3"></FontAwesomeIcon>
                        {props.telefone}
                    </h4>
                </div>
                <div className="col p-2 text-end">
                    <h4>
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="me-3"
                            onClick={() => { props.remover(props.id) }}></FontAwesomeIcon>
                    </h4>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ListaContatos;