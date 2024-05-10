const contatoServices = require('../services/contatoServices')

module.exports = {

    buscarTodos: async (req, res) =>{

        //Json padrao dessa API, ele tem tem os objetos 'error', para restornar os erros da API,
        //e o 'result', para retorna os resultados da API
        let json = {
            error:'', 
            result:[]
        };
        
        try{

        
        let idUsuario = req.params.idUsuario;

        //Variável contatos, é igual ao retono da função 'buscarTodos' da pasta contatoServices
        //que é um SELECT
        let contatos = await contatoServices.buscarTodos(idUsuario);

        //Esse for percorre o a variável 'contatos' que passou a ter o valor da resposta do SELECT
        for(let i in contatos){
            json.result.push({
                id: contatos[i].id,
                nome: contatos[i].nome,
                endereco: contatos[i].endereco,
                email: contatos[i].email,
                telefeone: contatos[i].telefone
            });
        }

        //retornando a resposta da API
        res.json(json);

        }catch(error){

            json.error = error;
            res.json(json);
        }
    },

    buscarUm: async (req, res) =>{

        //Json padrao dessa API, ele tem tem os objetos 'error', para restornar os erros da API,
        //e o 'result', para retorna os resultados da API
        let json = {
            error:'', 
            result:[]
        };
        
        try{

        let idUsuario = req.params.idUsuario;
        let idContato = req.body.idContato

        //Variável contatos, é igual ao retono da função 'buscarTodos' da pasta contatoServices
        //que é um SELECT
        let contato = await contatoServices.buscarUm(idUsuario, idContato);

        //Esse for percorre o a variável 'contatos' que passou a ter o valor da resposta do SELECT

        if(contato.length === 0 ){

            json.result.push({
                teste:"esse contato não existe"
            });

        }else{

            for(let i in contato){
                json.result.push({
                    id: contato[i].id,
                    nome: contato[i].nome,
                    endereco: contato[i].endereco,
                    email: contato[i].email,
                    telefeone: contato[i].telefone
                });
            }

        }
         
        //retornando a resposta da API
        res.json(json);

        }catch(error){

            json.error = error;
            res.json(json);
        }
    },

    inserir: async (req, res) =>{

        //Json padrao dessa API, ele tem tem os objetos 'error', para restornar os erros da API,
        //e o 'result', para retorna os resultados da API
        let json = {
            error:'', 
            result:[]
        };

        let idUsuario = req.params.idUsuario
        let nome = req.body.nome;
        let email = req.body.email;
        let telefone = req.body.telefone;
        let endereco = req.body.endereco;

        if(idUsuario && nome && email && telefone && endereco){
            try{

                //Se os parâmetro nescessário forem inserido, ocorrera a função inserir
                await contatoServices.inserir(nome, endereco, telefone, email, idUsuario)
                json.result.push ({
                    status: "Adicionado com sucesso",
                    nome: req.body.nome,
                    email: req.body.email,
                    telefone: req.body.telefone,
                    endereco: req.body.endereco,
                });

                //Enviando o resultado da API
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

        //Json padrao dessa API, ele tem tem os objetos 'error', para restornar os erros da API,
        //e o 'result', para retorna os resultados da API
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
        
                //se os parâmetros forem enviado altera o contato
                await contatoServices.alterar(nome,  endereco, telefone, email, idContato, idUsuario)
                json.result.push({
                    statu: 'Alterado com sucesso',
                    nome: req.body.nome,
                    endereco: req.body.endereco,
                    telefone: req.body.telefone,
                    email: req.body.email,
                    id: req.body.id
                }) 
                
                //retornando a resposta da API
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

        //Json padrao dessa API, ele tem tem os objetos 'error', para restornar os erros da API,
        //e o 'result', para retorna os resultados da API
        let json = {
            error:'',
            result:[]
        };
        
        try{

            let idContato = req.body.idContato;
            let idUsuario = req.params.idUsuario;   

            if(idContato && idUsuario){

                let contato = await contatoServices.buscarUm(idUsuario, idContato)

                if(contato.length === 0 ){

                    json.result.push({
                        teste:"esse contato não existe"
                    });

                }else{
                    
                    await contatoServices.excluir(idContato, idUsuario)

                    json.result.push({
                    status: "Contato excluído com sucesso",
                    id: req.body.id
                    });

                }
            

                res.json(json)

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

