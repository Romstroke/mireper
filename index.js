//consultas a bd
const { agregarCancion, cancionesTodas, actualizarCancion, eliminarCancion,verificarExistenciaCancion } = require("./consultas/consultas.js");
//express
const express = require('express');
const app = express()
//levantamiento servidor
app.listen(3000, () => console.log('servidor en puerto 3000'));
//middleware para recibir desde el front como json
app.use(express.json());

//carpeta public
app.use('/front', express.static(__dirname + '/public'));

//servir index
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

//instrucciones levantar servidor y rutas con verbos metodos y funciones el index da la respuesta del servidor, solo aqui hay res
//todo database aparte (funciones q hacen las acciones de las rutas)

//4 rutas

// /cancion agregar canciones

app.post('/cancion', async (req, res) => {
    const { titulo, artista, tono } = req.body;
    // const {id}= req.params;
    try {
        const resultado = await agregarCancion(titulo, artista, tono);
        // res.json(resultado);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(500).send("Error al agregar cancion: " + error.message);
    }
    // req.body // los datos pueden venir de un formulario o de un codigo de programacion //insert into en la funcion 
});

// get /canciones tiene que res.json todos los registros de tabla canciones

app.get('/canciones', async (req,res) => {
    try{
        const datos = Object.values(req.body);
        const respuesta = await cancionesTodas(datos);
        res.json(respuesta);
    }catch(error){
        res.status(500).send(error);
    }
    
});

// put /cancion actualiza canciones

// PUT /cancion para actualizar una canción existente
app.put('/cancion/:id', async (req, res) => {
    const id = req.params.id;
    const { titulo, artista, tono } = req.body;
    try {
        const cancionActualizada = await actualizarCancion(id, titulo, artista, tono);
        if (cancionActualizada) {
            res.status(200).json(cancionActualizada);
        } else {
            res.status(404).send("No se encontró ninguna canción para actualizar");
        }
    } catch (error) {
        res.status(500).send("Error al actualizar canción: " + error.message);
    }
});


// delete /cancion req.query de id de cancion

// ALTER SEQUENCE canciones_id_seq RESTART WITH 1;


// DELETE /cancion para eliminar una canción existente
app.delete('/cancion', async (req, res) => {
    const { id } = req.query;
    console.log("id:", id);
    try {
        // Primero verifica si la canción existe
        const existencia = await verificarExistenciaCancion(id);
        if (!existencia) {
            return res.status(404).send(`No se encontró ninguna canción con ID ${id} para eliminar`);
        }

        // Procede a eliminar la canción
        const resultado = await eliminarCancion(id);
        if (resultado.rowCount === 0) {
            return res.status(404).send(`No se encontró ninguna canción con ID ${id} para eliminar`);
        } else {
            return res.status(200).send(`Canción con ID ${id} eliminada correctamente`);
        }
    } catch (error) {
        return res.status(500).send("Error al eliminar canción: " + error.message);
    }
});

//ni enedit ni elim no hay que valdar si existeo no

