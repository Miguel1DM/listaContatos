let nodemailer = require('nodemailer');
let db = require('../../db');
require('dotenv').config({ path: 'variaveis.env' });

module.exports = {
    
    //Esse módulo apenas envia o código de verificação apartir desse email
    enviarEmail: (email, cdVerificacao) => {

        let user = process.env.EMAIL_USER;
        let pass = process.env.EMAIL_PASS;

        try{

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: { user, pass }
            })
    
            transporter.sendMail({
                from: user,
                to: email,
                subject: "Validar Email TECH FORCE",
                text: `O seu código de verificação é ${cdVerificacao}`
            })
            

        }catch(error){
            console.log(error)
        }
    },

    //Ja esse módulo verifica se o cóigo de verificação bate com o email ou vice e versa
    validarEmail: (email, codigoVerificacao) => {
        return new Promise((aceito, rejeitado) =>{
            db.query("SELECT id, verificacao FROM usuario WHERE email =? AND codigoVerificacao =?",
            [email, codigoVerificacao], (error, results) =>{
                if(error) {
                    rejeitado(error);
                    return;
                }
                aceito(results);
            })
        })
    },

    novoCodigo: (codigoVerificacao, email) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE usuario SET codigoVerificacao =? WHERE  email =?', 
            [codigoVerificacao, email], (error, results)=>{
                if(error) {
                    rejeitado(error); 
                    return;
                }
                aceito(results.insertCodigo); 
            })
            
        })
    
    }
    

}