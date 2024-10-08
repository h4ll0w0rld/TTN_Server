const mysql = require('mysql2');

require('dotenv').config();

//Database Params
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//Init connection
db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports = db;