const usuarioServices = require('../services/usuarioServices');
require('dotenv').config({ path: 'variaveis.env' });
const jwt = require('jsonwebtoken')
const db = require('../../db')

module.exports = {
    inserir: async (req, res) =>{

        let json = {
            error: '',
            result: []
        }

        try{

        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;

            if(nome && email && senha){
                await usuarioServices.inserir(nome, email, senha)
      
                  json.result.push({
                      status: "Usuário criado com sucesso",
                      nome: req.body.nome,
                      email: req.body.email,
                  })
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
    }
}

