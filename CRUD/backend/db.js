const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hospital'
});

connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar no banco:', err.stack);
      return;
    }
    console.log('Banco conectado com sucesso!');
  });

module.exports = connection;
