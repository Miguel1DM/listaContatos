const usuarioServices = require('../services/usuarioServices');

module.exports = {
    inserir: async (req, res) =>{

        let json = {
            error: '',
            results: []
        }

        try{

        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;
        
        if(nome && email && senha){
          await usuarioServices.inserir(nome, email, senha)

            json.results.push({
                status: "Usuário criado com sucesso",
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha

            })
            res.json(json);
        }else{

            json.error = 'Algum parâmetro enviado esta errado';
            res.json(json);
        }

        }catch(error){
                json.error ='Email ja cadastrado';
                res.json(json);
            
        }
    },

    login: async (req, res) =>{

        let json = {
            error: '',
            results: []
        }

        try{
            let email = req.body.email;
            let senha = req.body.senha;

            if(email && senha){

                let usuario = await usuarioServices.login(email, senha)

                if(usuario.length === 0){
                    json.results.push({
                        statusLogin: false,
                    })
                    res.json(json);
                }else{
                    json.results.push({
                        statusLogin: true,
                        id: usuario[0].id,
                        nome: usuario[0].nome,
                        email: usuario[0].email
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
    }
}