const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306
  });

connection.connect((error)=>{
    if(error) throw error;
    console.log(`Conctado ao Banco de Dados: ${process.env.DB_NAME}`)
})

module.exports = connection;