const db = require('../../db')

module.exports ={

    inserir: (nome, email, senha, verificacao, codigoVerificacao) =>{
        return new Promise((aceito, rejeitado) =>{

            db.query("INSERT INTO usuario (nome, email, senha, verificacao, codigoverificacao) VALUES (?, ?, ?, ?, ?)",
            [nome, email, senha, verificacao, codigoVerificacao], (error, results) =>{
                if(error){
                    rejeitado(error); 
                    return;
                }
                aceito(results);
            })
        })
    },

    login: (email, senha) =>{
        return new Promise((aceito, rejeitado) =>{
            db.query("SELECT nome, id, email, verificacao FROM usuario WHERE email =? AND senha =?",
            [email, senha], (error, results) =>{
                if(error) {
                    rejeitado(error);
                    return;
                }
                aceito(results);
            })
        })
    },

    alterarVerificacao: (verificacao, id) =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE usuario SET verificacao =? WHERE id =?', 
            [verificacao, id], (error, results)=>{
                if(error) {
                    rejeitado(error); 
                    return;
                }
                aceito(results.insertCodigo); 
            })
            
        })
    },
        
    recuperarSenha: (senha, email, codigoVerificacao) =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE usuario SET senha =? WHERE email =? AND codigoVerificacao =?', 
            [senha, email, codigoVerificacao], (error, results)=>{
                if(error) {
                    rejeitado(error); 
                    return;
                }
                aceito(results.insertCodigo); 
            })
            
        })
    }

}