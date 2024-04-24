const db = require('../../db')

module.exports ={

    inserir: (nome, email, senha) =>{
        return new Promise((aceito, rejeitado) =>{

            db.query("INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
            [nome, email, senha], (error, results) =>{
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
            db.query("SELECT nome, id, email FROM usuario WHERE email =? AND senha =?",
            [email, senha], (error, results) =>{
                if(error) {
                    rejeitado(error);
                    return;
                }
                aceito(results);
            })
        })
    }
        
}