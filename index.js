//consultas a bd
const {agregarCancion,cancionesTodas} = require("./consultas/consultas.js");
console.log(agregarCancion)
//express
const express = require('express');
const app = express()
//levantamiento servidor
app.listen(3000, () => console.log('servidor en puerto 3000'));
//middleware para recibir desde el fornt como json
app.use(express.json()); 


//instrucciones levantar servior y rutas con verbos metodos y funciones el index da la respuesta del servidor, solo aqui hay res
//todo database aparte (funciones q hacen las acciones de las rutas)

//4 rutas

// /cancion agregar canciones

app.post('/cancion', (req,res) => {
   console.log('holi')
    // req.body // los datos pueden venir de un formulario o de un codigo de programacion //insert into en la funcion 
});

// get /canciones tiene que res.json todos los registros de tabla canciones

// put /cancion actualiza canciones

// delete /cancion req.query de id de cancion 

//ni enedit ni elim no hay que valdar si existeo no

