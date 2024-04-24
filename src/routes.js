const express = require('express');
const router = express.Router();

const contatoController = require('./controller/contatoController');
const usuarioController = require('./controller/usuarioController');

//Rotas para os Contatos
router.get('/contatos/:idUsuario',contatoController.buscarTodos);
router.post('/novoContato/:idUsuario',contatoController.inserir);
router.put('/alterarContato/:idUsuario',contatoController.alterar);
router.delete('/excluirContato/:idUsuario',contatoController.excluir);

//Rotas para os usuários
router.post('/novoUsuario',usuarioController.inserir)
router.post('/login',usuarioController.login)

module.exports = router;