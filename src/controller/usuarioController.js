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

                    token = jwt.sign({userId: usuario[0].id }, process.env.SECRET, {expiresIn: '10h'})

                    json.result.push({
                        statusLogin: true,
                        id: usuario[0].id,
                        nome: usuario[0].nome,
                        email: usuario[0].email,
                        token: token
                    })
                    res.json(json);
                }

            }else if(!email && !senha){
                json.error = `Esta faltando os parâmetros`
                res.json(json);
            }else if(!senha){
                json.error = `Esta faltando o parâmetro senha`
                res.json(json);
            }else{
                json.error = `Esta faltando o email`
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

            const token = req.headers['bearer']
            const idUsuario = req.params.idUsuario
            try{

                if(!token){
                    json.result.push({
                        status: 'você nao passou o token'
                    })

                    res.josn(json)

                }else if (!idUsuario){
                    json.result.push({
                        status: 'você nao passou o idUsuario'
                    })

                    res.josn(json)
                }

                let decoded = jwt.verify(token, process.env.SECRET)

                if(decoded.userId != idUsuario) {

                    json.result.push({
                        status: "Acesso negado"
                    })
                    res.json(json);
                    
                }else{
                    json.result.push({
                        status: true
                    })
                    next();
                }
            }catch(error){

                if(error.name == "TokenExpiredError"){
                    json.result.push({
                        status: "O token expirou"
                    })
                }else{
                    json.error = error
                }

                res.json(json)
            }
    },

    recuperarSenha: async (req, res,) =>{

        let json = {
            error: '',
            result: []
        }

        try{

            let codigoVerificacao = gerarCodigoVerificacao();
            let email = req.body.email;
            let senha = req.body.novaSenha;
            let codVerificacao = req.body.codigoVerificacao;

            if(email && senha && codVerificacao){

                await usuarioServices.recuperarSenha(senha, email , codVerificacao);

                json.result.push({
                    status: "Senha alterada com sucesso"
                })

            }else{
                json.error = 'Algum parâmetro está faltando';
            }

            res.json(json);
        }catch(error){
            json.error = error;
            res.json(json);
        }
    },

    rotaValidarToken: (req, res) =>{

        let json = {
            error: '',
            result: []
        }

            const token = req.headers['bearer']
            try{

                if(!token){
                    json = { 
                        status: false,
                        message: 'token nao encontrado'
                    }

                    res.json(json)

                }

               jwt.verify(token, process.env.SECRET)

                    json = { 
                        status: true,
                        message: 'token validado'
                    }

                    res.json(json)
                
            }catch(error){

                if(error.name == "TokenExpiredError"){
                    json = { 
                        status: false,
                        message: 'token expirou'
                    }
                }else if (error.name == "JsonWebTokenError"){
                    json = { 
                        status: false,
                        message: `erro: ${error}`
                    }
                }

                res.json(json)
            }

    }

    
}

