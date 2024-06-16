const contatoServices = require('../services/contatoServices')

module.exports = {
    buscarTodos: async (req, res) =>{

        let json = {
            error:'', 
            result:[]
        };
        
        try{

        //Pegando os dados link da requisção
        let idUsuario = req.params.idUsuario;
        let contatos = await contatoServices.buscarTodos(idUsuario);

        //sintax nescessária para puxar todos os contatos
        for(let i in contatos){
            json.result.push({
                id: contatos[i].id,
                nome: contatos[i].nome,
                endereco: contatos[i].endereco,
                email: contatos[i].email,
                telefeone: contatos[i].telefone
            });
        }

        res.json(json);

        //tratando o erro
        }catch(error){
            json.error = error;
            res.json(json);
        }
    },

    inserir: async (req, res) =>{
        let json = {
            error:'', 
            result:[]
        };

        let idUsuario = req.params.idUsuario

        //Pegando os parâmetros pelo corpo da requisição
        let nome = req.body.nome;
        let email = req.body.email;
        let telefone = req.body.telefone;
        let endereco = req.body.endereco;

        if(idUsuario && nome && email && telefone && endereco){
            try{

               await contatoServices.inserir(nome, endereco, telefone, email, idUsuario)
                json.result.push ({
                    status: "Adicionado com sucesso",
                    nome: req.body.nome,
                    email: req.body.email,
                    telefone: req.body.telefone,
                    endereco: req.body.endereco,
                });

                res.json(json);
            }catch(error){
                json.error = error.message;
                res.status(500).json(json);
            }
            }else{
                json.error = 'Algum parâmetro enviado esta errado'
                res.json(json);
        }
    },

    alterar: async (req, res) =>{
        let json = {
            error:'',
            result:[]
        };
        
        let idUsuario = req.params.idUsuario;
        let idContato = req.body.id;
        let nome = req.body.nome;
        let endereco = req.body.endereco;
        let telefone = req.body.telefone;
        let email = req.body.email;

        if(nome && endereco && telefone && email && idContato && idUsuario){
            try{
        
                //Fazendo as querySql ocorrerem, e passando os parãmetros delas
                await contatoServices.alterar(nome,  endereco, telefone, email, idContato, idUsuario)
                json.result.push({
                    statu: 'Alterado com sucesso',
                    nome: req.body.nome,
                    endereco: req.body.endereco,
                    telefone: req.body.telefone,
                    email: req.body.email,
                    id: req.body.id
                }) 

                res.json(json);
            }catch(error){
                json.error = error;
                res.json(json);
            }

        }else{
            json.error = 'Algum parâmetro enviado esta errado'
            res.json(json);
        }
    },

    excluir: async (req, res) =>{

        let json = {
            error:'',
            result:[]
        };
        
        try{

            let idContato = req.body.id;
            let idUsuario = req.params.idUsuario;

            if(idContato && idUsuario){
                await contatoServices.excluir(idContato, idUsuario)

                json.result.push({
                    status: "Contato excluído com sucesso",
                    id: req.body.id
                });

                res.json(json);
            }else{
                json.error = 'Algum parâmetro enviado esta errado';
                res.json(json);
            }
        }catch(error){
            json.error = error;
            res.json(json);
        }
    }
}