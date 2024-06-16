const usuarioServices = require('../services/usuarioServices');
const emailServices = require('../services/emailServices');
require('dotenv').config({ path: 'variaveis.env' });
const jwt = require('jsonwebtoken');

function gerarCodigoVerificacao() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

module.exports = {
    inserir: async (req, res) =>{

        let json = {
            error: '',
            result: []
        }

        let codigoVerificacao = gerarCodigoVerificacao();

        try{

        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;

            if(nome && email && senha){


                await usuarioServices.inserir(nome, email, senha, (false), codigoVerificacao)
      
                json.result.push({
                      status: "Cadastro feito",
                      verificacao: false,
                      nome: req.body.nome,
                      email: req.body.email,
                })

                emailServices.enviarEmail(email, codigoVerificacao)

                res.json(json);
              }else{
      
                  json.error = 'Algum parâmetro enviado esta errado';
                  res.json(json);
              }
        
        }catch(error){
            json.error = error;

            if(json.error.code == "ER_DUP_ENTRY"){
                json.error = 'Email ja cadastrado';
            }
            res.json(json);
        }
    },

    login: async (req, res) =>{

        let json = {
            error: '',
            result: []
        }

        try{
            let email = req.body.email;
            let senha = req.body.senha;

            if(email && senha){

                let usuario = await usuarioServices.login(email, senha)

                if(usuario.length === 0){
                    json.result.push({
                        statusLogin: false,
                    })
                    res.json(json);

                }else if(usuario[0].verificacao == false){

                    json.result.push({
                        statusLogin: "Email não verificado"
                    })

                    res.json(json)

                }else{

                    token = jwt.sign({userId: usuario[0].id }, process.env.SECRET, {expiresIn: 600})

                    json.result.push({
                        statusLogin: true,
                        id: usuario[0].id,
                        nome: usuario[0].nome,
                        email: usuario[0].email,
                        token: token
                    })
                    res.json(json);
                }

            }else{
                json.error = 'Esta faltando algum parâmetro'
                res.json(json);
            }

        }catch(error){
            json.error = error;
            res.json(json);
        }
    },

    validarToken: (req, res, next) =>{

        let json = {
            error: '',
            result: []
        }

            const token = req.headers['x-access-token']
            jwt.verify(token, process.env.SECRET, (err, decoded) =>{

                if(err){
                    json.error = 'Token inválido'
                    res.json(json);
                }

                if (decoded.userId != req.params.idUsuario) {
                    json.result.push({
                        status: 'Acesso Negado'
                    })
                    res.json(json);
                    
                }else{
                    json.result.push({
                        status: 'Acesso permitido'
                    })
                    next();
                }
            })
    },

    recuperarSenha: async (req, res,) =>{

        let json = {
            error: '',
            result: []
        }

        try{
            let email = req.body.email;
            let senha = req.body.senha;
            let codVerificacao = req.body.codigoVerificacao;

            if(email && senha && codVerificacao){

                let resultado = await usuarioServices.recuperarSenha(senha, email , codVerificacao);

                if(resultado.affectedRows === 1){
                    json.result.push({
                        status: "Senha alterada com sucesso"
                    })

                }else{
                    json.result.push({
                        status: "codigo Errado"
                    })
                }
            }else{
                json.error = 'Algum parâmetro está faltando';
            }

            res.json(json);
        }catch(error){
            json.error = error;
            res.json(json);
        }
    }
}

