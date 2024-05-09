const express = require('express');
const router = express.Router();

const contatoController = require('./controller/contatoController');
const usuarioController = require('./controller/usuarioController');
const emailController = require('./controller/emailController');

//Rotas para os Contatos
router.get(`/contatos/:idUsuario`, usuarioController.validarToken, contatoController.buscarTodos);
router.post('/novoContato/:idUsuario', usuarioController.validarToken, contatoController.inserir);
router.put('/alterarContato/:idUsuario', usuarioController.validarToken, contatoController.alterar);
router.delete('/excluirContato/:idUsuario', usuarioController.validarToken, contatoController.excluir);

//rotas para os emails
router.post('/validarEmail', emailController.validarEmail);
router.post('/novoCodigo', emailController.novoCodigo);

//Rotas para os usuários
router.post('/novoUsuario', usuarioController.inserir)
router.post('/login', usuarioController.login)
router.post('/recuperarSenha', usuarioController.recuperarSenha)

//Rotas token
router.post('/validarToken', usuarioController.rotaValidarToken)

module.exports = router;
