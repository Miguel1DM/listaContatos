import React from 'react';
import './redefinir.css';

function Redefinir({goToSignIn, goToNovaSenha}){
    return(
            <div className='fundoRedefinir'>

                <div className='elementosRedefinir'>
                        <h1>Contact Post</h1>
                        <p className='subtitulo'>Informe o E-mail para redefinir sua senha</p>
                    <div className='email'>
                        <p>E-mail</p>
                        <input className='inputEmail' type='text'></input>
                    </div>
                    
                    <button className='btnEnviar_link' onClick={goToNovaSenha} >Enviar Link</button>

                    <div className='voltarLogin' onClick={goToSignIn} >Voltar a tela de login</div>

                </div>


            </div>
    );
}

export default Redefinir;