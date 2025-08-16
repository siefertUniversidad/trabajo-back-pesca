let contadorID = 1;

const form = document.getElementById("formArticulo");
const tabla = document.getElementById("tablaArticulos").getElementsByTagName("tbody")[0];

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const categoria = document.getElementById("categoria").value;
  const precio = document.getElementById("precio").value;
  const stock = document.getElementById("stock").value;
  const proveedor = document.getElementById("proveedor").value;

  const fila = tabla.insertRow();
  fila.innerHTML = `
    <td>${contadorID++}</td>
    <td>${nombre}</td>
    <td>${categoria}</td>
    <td>${precio}</td>
    <td>${stock}</td>
    <td>${proveedor}</td>
  `;

  form.reset();
});
