const mysql = require('mysql2/promise');
require('dotenv').config();
const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const PASSW = process.env.MYSQL_PASSWORD;
const DB    = process.env.MYSQL_DB;

const connection =  mysql.createPool({
    host:   HOST,
    user: USER,
    password: PASSW,
    database: DB
});
 
module.exports = connection;