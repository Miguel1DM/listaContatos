import React from 'react';
import './style.css';

function Header(){
    return(
        <div className='telaLogin'>
            <div className='fundoLogin'>
                <div className='elementosLogin'>
                        <h1>Contact Post</h1>
                        <p className='subtitulo'>Faça login para acessar sua lista de contatos</p>
                    <div className='email'>
                        <p>Email</p>
                        <input className='inputEmail' type='text'></input>
                    </div>

                    <div className='senha'>
                        <p>Senha</p>
                        <input className='inputSenha' type='password' max={20} min={7} ></input>
                    </div>

                    <p className='esquecerSenha'>Esqueceu a sua senha? <label className='esquecerSenha_link'>Clique aqui</label></p>

                    <button className='btnLogin'>Login</button>

                    <p className='cliqueCadastrar'>Não tem uma conta? <label className='cliqueCadastrar_link'>Cadastre-se agora</label></p>
                </div>

            </div>
        </div>
    );
}

export default Header;