//consultas a bd
const { agregarCancion, cancionesTodas, actualizarCancion, eliminarCancion} = require("./consultas/consultas.js");
//express
const express = require('express');
const app = express()
//levantamiento servidor
app.listen(3000, () => console.log('servidor en puerto 3000'));
//middleware para recibir desde el front como json
app.use(express.json());
//carpeta public
app.use('/front', express.static(__dirname + '/public'));
//servir html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// /cancion agregar canciones
app.post('/cancion', async (req, res) => {
    const { titulo, artista, tono } = req.body;
    try {
        const resultado = await agregarCancion(titulo, artista, tono);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(500).send("Error al agregar cancion: " + error.message);
    }
});

// get /canciones tiene que res.json todos los registros de tabla canciones
app.get('/canciones', async (req, res) => {
    try {
        const datos = Object.values(req.body);
        const respuesta = await cancionesTodas(datos);
        res.json(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
    
});

// put /cancion actualiza canciones
app.put('/cancion/:id', async (req, res) => {
    const id = req.params.id;
    const { titulo, artista, tono } = req.body;
    try {
        const cancionActualizada = await actualizarCancion(id, titulo, artista, tono);
        res.status(200).json(cancionActualizada);
    } catch (error) {
        res.status(500).send("Error al actualizar canción: " + error.message);
    }
});

// delete /cancion req.query de id de cancion
app.delete('/cancion', async (req, res) => {
    const { id } = req.query;
    console.log("id:", id);
    try {
        await eliminarCancion(id);
        return res.status(200).send(`Canción con ID ${id} eliminada correctamente`);
    } catch (error) {
        return res.status(500).send("Error al eliminar canción: " + error.message);
    }
});

// ALTER SEQUENCE canciones_id_seq RESTART WITH 1;

