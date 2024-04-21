const express = require('express');
const router = express.Router();

const carroController = require('./controllers/carroController');

router.get('/carros',carroController.buscarTodos);
router.get('/carro/:id',carroController.buscarUm);
router.post('/carro', carroController.inserir);
router.put('/carro/:id', carroController.alterar);
router.delete('/carro/:id', carroController.excluir);

module.exports = router;