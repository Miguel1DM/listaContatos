import React from 'react';
import './cadastro.css';
import imgLogin from '../../img/imgLogin.png';

function Cadastrar({goToVerificar}){
    return(
        
        <div className='fundoCadastro'>
                <img src={imgLogin} alt='imgLogin'></img>
            
                <div className='elementosCadastro'>

                    <h1>Contact Post</h1>
                    <p className='subtitulo'>Faça seu cadastro para criar suas listas de contatos</p>

                    <div className='nome'>
                        <p>Nome Completo</p>
                        <input type='text'></input>
                    </div>

                    <div className='email'>
                        <p>E-mail</p>
                        <input type='text'></input>
                    </div>

                    <div className='senha'>
                        <p>Senha</p>
                        <input type='password'></input>
                    </div>

                    <div className='confirmarSenha'>
                        <p>Confirmar Senha</p>
                        <input type='password'></input>
                    </div>

                    <button className='btnCadastro' onClick={goToVerificar}>Cadastrar</button>

                </div>
            </div>
    );
}

export default Cadastrar;