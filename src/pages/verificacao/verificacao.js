import React from 'react';
import './verificacao.css';

function Verificar({goToSignIn}){
    return(
            <div className='fundoVerificar'>

                <div className='elementosVerificar'>
                        <h1>Contact Post</h1>
                        <p className='subtitulo'>Um código de verificação foi enviado para o seu E-mail</p>
                    <div className='verificar'>
                        <p>Código de Verificação</p>
                        <input className='inputCodVerificacao' type='text'></input>
                    </div>
                    
                    <button className='btnProsseguir' onClick={goToSignIn} >Prosseguir</button>
                    
                </div>


            </div>
    );
}

export default Verificar;