const db = require('../../db');

module.exports = {
    buscarTodos: (idUsuario) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM contato WHERE idUsuario =?', [idUsuario], (error, results)=>{
                if(error) {rejeitado(error); return;}
                aceito(results);
                
            })
            
        })
        
    },
    
    inserir: (nome, endereco, telefone, email, idUsuario) =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO contato (nome, endereco, telefone, email, idUsuario) VALUES (?, ?, ?, ?, ?)',
        [nome, endereco, telefone, email, idUsuario], (error, results)=>{
            if(error) {
                rejeitado(error); return;
            }
                aceito(results.insertCodigo);
        })
        })
    },

    alterar: (nome, endereco, telefone, email, id, idUsuario) =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE contato SET nome =?, endereco =?, telefone =?, email =? WHERE id =? AND idUsuario =?', 
            [nome,  endereco, telefone, email, id, idUsuario], (error, results)=>{
                if(error) {
                    rejeitado(error); 
                    return;
                }
                aceito(results.insertCodigo); 
            })
            
        })
    },

    excluir: (id, idUsuario) =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM contato WHERE id =? AND idUsuario =?',
            [id, idUsuario], (error, results)=>{
            if(error){
                rejeitado(error);
                return;
            }
            aceito(results.insertCodigo); 
        })
        })
    }
}