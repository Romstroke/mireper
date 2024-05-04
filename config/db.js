//conexion base de datos

const pg = require('pg');
require('dotenv').config();

const { Pool } = pg;

const { DB_PORT, DB_PASSWORD, DB_USER, DB_DATABASE, DB_HOST } = process.env;

const config = {
    port: DB_PORT,
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    allowExitOnIdle: true
};

const pool = new Pool(config);

// Este console.log solo se ejecutará en Node.js
// console.log(config);

module.exports = pool;
