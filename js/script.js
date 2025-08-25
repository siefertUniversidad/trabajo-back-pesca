// Ojo 1.
if (window.location.href.includes("index.html") && localStorage.getItem("compraExitosa")) {
  document.getElementById("mensajeExito").style.display = "block";
  localStorage.removeItem("compraExitosa");
}

const formCarrito = document.getElementById("formCarrito");
const tablaCarrito = document.getElementById("tablaCarrito")?.getElementsByTagName("tbody")[0];
const continuarBtn = document.getElementById("continuarCompra");
const formCliente = document.getElementById("formCliente");
const formFinal = document.getElementById("formFinal");

if (formCarrito) {
  formCarrito.addEventListener("submit", function(e) {
    e.preventDefault();
    const producto = document.getElementById("producto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precio = parseInt(document.getElementById("precio").value);
    const total = cantidad * precio;

    const fila = tablaCarrito.insertRow();
    fila.innerHTML = `<td>${producto}</td><td>${cantidad}</td><td>${total}</td>`;

    formCarrito.reset();
  });
}

// Ojo 2.
if (continuarBtn) {
  continuarBtn.addEventListener("click", function() {
    formCliente.style.display = "block";
    continuarBtn.style.display = "none";
  });
}

if (formFinal) {
  formFinal.addEventListener("submit", function(e) {
    e.preventDefault();
    localStorage.setItem("compraExitosa", "true");
    window.location.href = "index.html";
  });
}
