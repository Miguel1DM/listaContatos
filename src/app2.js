import React, { useState, useRef, useEffect } from 'react';
import Login from './Pages/login/login';
import Cadastrar from './Pages/cadastro/cadastro';
import Verificar from './Pages/verificacao/verificacao';
import Redefinir from './Pages/redefinir/redefinir';
import NovaSenha from './Pages/nova_senha/nova_senha';
import Contatos from './Pages/contatos/Contato';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faList, faTrash } from "@fortawesome/free-solid-svg-icons";
import { v4 as chave } from 'uuid'
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [animationClass, setAnimationClass] = useState('page-fade-in');
  const [showListaContatos, setShowListaContatos] = useState(false); // Variável de estado para controlar a visibilidade

  const [contato, setContato] = useState({ id: '', nome: '', telefone: '' });
  const [listaContatos, setListaContatos] = useState([]);
  const inputNome = useRef();
  const inputTelefone = useRef();

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login goToContatos={() => { changePage('contatos'); setShowListaContatos(true); }} goToSignUp={() => changePage('cadastro')} goToForgotPassword={() => changePage('redefinir')} />;
      case 'cadastro':
        return <Cadastrar goToVerificar={() => changePage('verificacao')} />;
      case 'verificacao':
        return <Verificar goToSignIn={() => changePage('login')} />;
      case 'redefinir':
        return <Redefinir goToSignIn={() => changePage('login')} goToNovaSenha={() => changePage('nova_senha')} />;
      case 'nova_senha':
        return <NovaSenha goToSignIn={() => changePage('login')} />;
      default:
        return null;
    }
  };

  const changePage = (goToSignIn) => {
    setAnimationClass('page-fade-out');
    setTimeout(() => {
      setCurrentPage(goToSignIn);
      setAnimationClass('page-fade-in');
    }, 500);
  };

  function definirNome(event) {
    setContato({ ...contato, nome: event.target.value })
  }

  function definirTelefone(event) {
    setContato({ ...contato, telefone: event.target.value })
  }

  function adicionarContato() {
    if (contato.nome === "" || contato.telefone === "") return;
    let duplicando = listaContatos.find((ct) => ct.nome === contato.nome && ct.telefone === contato.telefone)
    if (typeof duplicando !== 'undefined') {
      inputTelefone.current.focus();
      return;
    }
    setListaContatos([...listaContatos, { ...contato, id: chave() }])
    setContato({ nome: '', telefone: '' })
    inputNome.current.focus();
  }

  function enterAdicionarContato(event) {
    if (event.code === "Enter") {
      adicionarContato()
    }
  }

  useEffect(() => {
    if (localStorage.getItem('meus_contatos') !== null) {
      setListaContatos(JSON.parse(localStorage.getItem('meus_contatos')))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('meus_contatos', JSON.stringify(listaContatos))
  }, [listaContatos])

  function limparStorage() {
    setListaContatos([])
  }

  function removerContato(id) {
    let tmp = listaContatos.filter(ct => ct.id !== id)
    setListaContatos(tmp)
  }

  return (
    <div className={`page-container ${animationClass}`}>
      {renderPage()}

      {/* Renderiza a lista de contatos apenas se showListaContatos for true */}
      {showListaContatos && (
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
                      <input type="text" ref={inputNome} onChange={definirNome} value={contato.nome} className="form-control" />
                    </div>
                    <div>
                      <label className="form-label">Telefone</label><br />
                      <input type="text" ref={inputTelefone} onChange={definirTelefone} onKeyUp={enterAdicionarContato} value={contato.telefone} className="form-control" />
                    </div>
                    <div className="row mt-3">
                      <div className="col text-start">
                        <button onClick={limparStorage} className="btn btn-outline-danger">
                          <FontAwesomeIcon icon={faTrash} className="me-2" />
                          Limpar Lista
                        </button>
                      </div>
                      <div className="col text-end">
                        <button onClick={adicionarContato} className="btn btn-outline-success">
                          <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <ul>
                  {listaContatos.map(ct => {
                    return <Contatos key={ct.id} id={ct.id} nome={ct.nome} telefone={ct.telefone} remover={removerContato} />
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
