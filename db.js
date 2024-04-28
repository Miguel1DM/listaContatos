const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306,
    ssl: {
        // Habilita o uso de SSL/TLS
        rejectUnauthorized: true // Rejeita conexões não autorizadas
      }
});

connection.connect((error)=>{
    if(error) throw error;
    console.log(`Conctado ao Banco de Dados: ${process.env.DB_NAME}`)
})

module.exports = connection;

