let emailServices = require('../services/emailServices')
let usuarioServices = require('../services/usuarioServices')
require('dotenv').config({ path: 'variaveis.env' });

function gerarCodigoVerificacao() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

module.exports = {

    // enviarEmail: (req, res) => {

    //     let json = {
    //         error: '',
    //         result: []
    //     }

    //     try{

    //     let email = req.body.email

    //     emailServices.enviarEmail(email, 1234)

    //     json.result.push({
    //         status: "Enviado",
    //         enviadoPara: email

    //     })

    //     res.json(json);

    //     }catch(error){
    //         json.error = error;
    //         res.json(json);
    //     }
    // },

    validarEmail: async (req, res) => {
        let json = {
            error: '',
            result: []
        };
    
        try {
            let email = req.body.email;
            let cdVerificacao = req.body.codigoVerificacao;
    
            if (email && cdVerificacao) {
                let resultado = await emailServices.validarEmail(email, cdVerificacao);
    
                if (resultado.length === 0) {
                    json.result.push({
                        status: 'Código de verificação incorreto'
                    });

                }else if(resultado[0].verificacao == true) {

                    json.result.push({
                        status: 'Este email já foi verificado'
                    });

                }else if(resultado[0].verificacao == false) {

                    usuarioServices.alterarVerificacao(true, resultado[0].id);
                    json.result.push({
                        status: 'Email verificado'
                    });


                }
            }else{
                json.result.push({
                    status: 'Algum parâmetro está faltando'
                });
            }
            res.json(json);
        } catch (error) {
            json.error = error;
            res.json(json);
        }
    },

    novoCodigo: async (req, res, next) => {
        let json = {
            error: '',
            result: []
        }

        try{

            let novoCodigo = gerarCodigoVerificacao();
            
            let email = req.body.email;

            if(email && novoCodigo){
                await emailServices.novoCodigo(novoCodigo, email)

                emailServices.enviarEmail(email,novoCodigo)

                json.result.push({
                    status: "Código redefinido com sucesso"
                })
            }else{
                json.result.push({
                    status: 'Algum parâmetro está faltando'
                })
            }
            res.json(json)
        }catch(error){
            json.error = error;
            res.json(json)
        }
    }
}