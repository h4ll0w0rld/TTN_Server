const mysql = require('mysql');

const dbconnection = mysql.createConnection({
    host: 'localhost',
    user: 'lora',
    password: 'your_password_here',
    database: 'LoRa'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

module.exports = dbConnection;


