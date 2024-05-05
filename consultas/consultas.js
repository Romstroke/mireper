//conexion bd // ESTO VA PARA CONSULTAS
const pool = require('../config/db.js');

// tbody 61 se va llenado de canciones

//79 url de base

//89 get en cancion

// POST /cancion: Recibe los datos correspondientes a una canción y realiza la inserción en la tabla canciones. 

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
        // Aquí manejarías cualquier error que ocurra durante la ejecución de la consulta
        console.error("Error al agregar canción:", error);
        throw error; // Puedes lanzar el error nuevamente para manejarlo en el contexto que llama a esta función
    }
}

// GET /canciones: Devuelve un JSON con los registros de la tabla canciones. 

const cancionesTodas = async () => {
    try {
      const consulta = {
        text: "SELECT * FROM canciones order by id",
        // rowMode: "array",
      };
      const res = await pool.query(consulta);
      console.log(
        `el registro actual de canciones es ${JSON.stringify(res.rows)}`
      );
      return res.rows;
  
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

//   PUT /cancion: Recibe los datos de una canción que se desea editar y ejecuta una función asíncrona para hacer la consulta SQL y actualice ese registro de la tabla canciones. 

const actualizarCancion = async function(id, titulo, artista, tono) {
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
            return null; // O puedes devolver un mensaje de error o lanzar una excepción
        }
        
    } catch (error) {
        console.log(error.code, error.message);
        throw error; // Puedes lanzar el error nuevamente para manejarlo en el contexto que llama a esta función
    }
};

// actualizarCancion(1,'c','d','c')
  
// DELETE /cancion: Recibe por queryString el id de una canción y realiza una consulta SQL a través de una función asíncrona para eliminarla de la base de datos. 

const eliminarCancion = async (id) => {
    try {
        const consulta = {
            text: "DELETE FROM canciones WHERE id = $1 returning *",
            values: [id],
        };
        const res = await pool.query(consulta);
        console.log(`Canción con id ${id} eliminada correctamente!`);
        return res.rowCount; // Devuelve el número de filas eliminadas
    } catch (error) {
        console.error("Error al eliminar canción:", error);
        throw error; // Lanza el error nuevamente para manejarlo en el contexto que llama a esta función
    }
};

// eliminarCancion(1)

const verificarExistenciaCancion = async (id) => {
    const consulta = {
        text: "SELECT * FROM canciones WHERE id = $1",
        values: [id]
    };
    const res = await pool.query(consulta);
    return res.rowCount > 0; // Devuelve true si la canción existe
}


module.exports = {agregarCancion,cancionesTodas,actualizarCancion,eliminarCancion,verificarExistenciaCancion};
