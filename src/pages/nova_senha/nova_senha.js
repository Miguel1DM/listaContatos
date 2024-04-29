import React from 'react';
import './nova_senha.css';

function NovaSenha({goToSignIn}){
    return(
        
        <div className='fundoNova_senha'>
            
                <div className='elementosNova_senha'>

                    <h1>Contact Post</h1>
                    <p className='subtitulo'>Altere sua senha para prosseguir</p>

                    <div className='nova_senha'>
                        <p>Senha Nova</p>
                        <input type='password'></input>
                    </div>

                    <div className='confirmarNova_senha'>
                        <p>Confirmar Senha Nova</p>
                        <input type='password'></input>
                    </div>

                    <button className='btnNova_senha' onClick={goToSignIn} >Redefinir Senha</button>

                </div>
            </div>
    );
}

export default NovaSenha;