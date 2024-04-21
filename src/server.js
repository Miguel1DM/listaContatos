// lendo o arquivo 'variaveis.env' para pegar as variaveis de ambiente da API
require('dotenv').config({ path: 'variaveis.env' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const router = require('./routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
