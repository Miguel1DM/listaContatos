const carroServices = require('../services/carroServices');

module.exports = {
        buscarTodos: async (req, res) =>{
            let json = {error:'', result:[]};

            let carros = await carroServices.buscarTodos();

            for(let i in carros){
                json.result.push({
                    id: carros[i].id,
                    descricao: carros[i].modelo
                });
            }
            res.json(json);
        },
        buscarUm: async(req, res) =>{
            let json = {error:'', result: {}};

            let id = req.params.id;
            let carro = await carroServices.buscarUm(id);

            if(carro){
                json.result = carro;
            }

            res.json(json);
        },
        inserir: async(req, res) =>{
            let json = {error:'', result: {}};

            let modelo = req.body.modelo;
            let placa = req.body.placa;

            if(modelo && placa){

                let novoCarro = await carroServices.inserir(modelo, placa)
                json.result = 'Carro adicionado com sucesso';

            }else{
                json.error = 'Campos não enviados';
            }
            res.json(json);
        },

        alterar: async(req, res) =>{
            let json = {error:'', result: {}};

            let id = req.params.id;
            let modelo = req.body.modelo;
            let placa = req.body.placa;

            if(id && modelo && placa){
                await carroServices.alterar(id, modelo, placa)
                json.result = 'Carro alterado com sucesso';

            }else{
                res.json(json);
            }
            res.json(json);
        },

        excluir: async(req, res) =>{
            let json = {error:'', result: {}};

            await carroServices.excluir(req.params.id)
            json.result = 'Carro excluido com sucesso';
            
            res.json(json);
        }
}