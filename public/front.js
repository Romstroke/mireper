let url = "/cancion";
let tbody = document.getElementById("cuerpo");
let cancion = document.getElementById("cancion");
let artista = document.getElementById("artista");
let tono = document.getElementById("tono");

let canciones = [];
window.onload = getData();

async function getData() {
  await axios.get(url + "es").then((data) => {
    canciones = data.data;
    tbody.innerHTML = "";
    console.log(canciones)
    canciones.forEach((c, i) => {
      tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${c.titulo}</td>
          <td>${c.artista}</td>
          <td>${c.tono}</td>
          <td>
            <button class="btn btn-warning" onclick="prepararCancion(${i},'${c.id
        }')">Editar</button>
            <button class="btn btn-danger" onclick="eliminarCancion(${i},'${c.id
        }')">Eliminar</button>
          </td>
        </tr>
      `;
    });
  });
  cancion.value = "";
  artista.value = "";
  tono.value = "";
}

function nuevaCancion() {
  cancion;
  artista;
  tono;
  if (!ValidacionCampos()) return;
  let data = {
    titulo: cancion.value,
    artista: artista.value,
    tono: tono.value,
  };
  console.log(data);
  axios.post(url, data).then(() => getData());

}

function eliminarCancion(i, id) {
  axios.delete(url + "?id=" + id)
    .then(() => {
      alert("Canción " + canciones[i].titulo + " eliminada");
      getData();
    })
    .catch(error => {
      console.error("Error al eliminar la canción:", error);
      alert("Error al eliminar la canción: " + (error.response?.statusText || "Sin mensaje de error"));
    });
}

function prepararCancion(i, id) {
  cancion.value = canciones[i].titulo;
  artista.value = canciones[i].artista;
  tono.value = canciones[i].tono;
  document
    .getElementById("editar")
    .setAttribute("onclick", `editarCancion('${id}')`);
  document.getElementById("agregar").style.display = "none";
  document.getElementById("editar").style.display = "block";
}

function editarCancion(id) {
  if (!ValidacionCampos()) return;
  axios
    .put(url + "/" + id, {
      titulo: cancion.value,
      artista: artista.value,
      tono: tono.value,
    })
    .then(() => {
      getData();
      document.getElementById("agregar").style.display = "block";
      document.getElementById("editar").style.display = "none";
    });
}

//funcion que valida si están vacíos los campos para agregar y editar

function ValidacionCampos() {
  if (!cancion.value || !artista.value || !tono.value) {
    alert("Todos los campos deben estar completos.");
    return false;
  }
  return true;
}



