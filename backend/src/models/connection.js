const mysql = require('mysql8/promise');

const connection = mysql.createPool({
    host: '3306',
    user: 'root',
    password: '1234',
    database: 'todolist'
});

module.exports = connection;