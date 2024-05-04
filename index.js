//instrucciones levantar servior y rutas con verbos metodos y funciones el index da la respuesta del servidor, solo aqui hay res
//todo database aparte (funciones q hacen las acciones de las rutas)

//4 rutas

// /cancion agregar canciones

app.post('/cancion', (req,res) => {
    req.body // los datos pueden venir de un formulario o de un codigo de programacion //insert into en la funcion 
});

// get /canciones tiene que res.json todos los registros de tabla canciones

// put /cancion actualiza canciones

// delete /cancion req.query de id de cancion 

//ni enedit ni elim no hay que valdar si existeo no

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
