//conexion bd 
const pool = require('../config/db.js');
// manejo de errores
const manejoErrores = require('../manejoErrores/manejoErrores.js');

//post /cancion
async function agregarCancion(titulo, artista, tono) {
    try {
        const consulta = {
            text: "insert into canciones (titulo,artista,tono) values ($1, $2, $3) returning *",
            values: [titulo, artista, tono]
        };

        const result = await pool.query(consulta);
        console.log(`La canción ${titulo} - ${artista} fue agregado correctamente`);

        console.log(result.rows[0]);

        return result.rows[0]; // esto es lo que desvuelve en el thunderclient
    } catch (error) {
        console.error("Error al agregar canción:", error);
        manejoErrores(error, pool, 'canciones')
    }
}

//get /canciones
const cancionesTodas = async () => {
    try {
        const consulta = {
            text: "SELECT * FROM canciones order by id",
            // rowMode: "array",
        };
        const resultado = await pool.query(consulta);
        console.log(
            `el registro actual de canciones es ${JSON.stringify(resultado.rows)}`
        );
        return resultado.rows;

    } catch (error) {
        console.log(error.code, error.message);
        manejoErrores(error, pool, 'canciones')
    }
};

//put /cancion
const actualizarCancion = async function (id, titulo, artista, tono) {
    try {
        const consultaUpdate = {
            text: "UPDATE canciones SET titulo = $2, artista = $3, tono = $4 WHERE id = $1",
            values: [id, titulo, artista, tono],
        };
        const resUpdate = await pool.query(consultaUpdate);
        console.log(resUpdate.rowCount, "Filas actualizadas");

        if (resUpdate.rowCount > 0) {
            const consultaSelect = {
                text: "SELECT * FROM canciones WHERE id = $1",
                values: [id],
            };
            const resSelect = await pool.query(consultaSelect);
            console.log("Canción actualizada:", resSelect.rows[0]);
            return resSelect.rows[0];
        } else {
            console.log("No se encontró ninguna canción para actualizar");
        }

    } catch (error) {
        console.log(error.code, error.message);
        manejoErrores(error, pool, 'canciones')    
    }
};

// delete /cancion
const eliminarCancion = async (id) => {
    try {
        const consulta = {
            text: "DELETE FROM canciones WHERE id = $1",
            values: [id],
        };
        const res = await pool.query(consulta);
        console.log(`Canción con id ${id} eliminada correctamente!`);
        return res.rowCount;
    } catch (error) {
        console.error("Error al eliminar canción:", error);
        manejoErrores(error, pool, 'canciones')
    }
};

module.exports = { agregarCancion, cancionesTodas, actualizarCancion, eliminarCancion };
