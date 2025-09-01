document.addEventListener("DOMContentLoaded", () => {

  const enIndex = location.pathname.endsWith("index.html") || location.pathname.endsWith("/") || location.pathname === "";
  if (enIndex && localStorage.getItem("compraExitosa")) {
    const msg = document.getElementById("mensajeExito");
    if (msg) msg.style.display = "block";
    localStorage.removeItem("compraExitosa");
  }


  const formCarrito = document.getElementById("formCarrito");
  const tablaCompraBody = document.getElementById("tablaCompra");
  const continuarBtn = document.getElementById("continuar");
  const formCliente = document.getElementById("formCliente");
  const formFinal = document.getElementById("formFinal");

 
  const inputRut = document.getElementById("rutCliente");
  if (inputRut) {
    inputRut.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9kK-]/g, "").replace(/k/g, "K");
    });
  }

  const inputContacto = document.getElementById("contactoCliente");
if (inputContacto) {
  inputContacto.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9+ ]/g, ""); 
  });
}

  // Precios
  const PRECIOS = {
    "Caña de Pescar": 25000,
    "Carrete Shimano": 40000,
    "Señuelo Rapala": 8000,
    "Línea Trenzada RUVADAS": 12000,
    "Anzuelos Pesca": 5000,
    "Caja Organizadora de Señuelos": 8000,
  };

  // Lógica del carrito
  if (formCarrito) {
    const productoSelect = document.getElementById("producto");
    const inputPrecio = document.getElementById("precio");
    const inputCantidad = document.getElementById("cantidad");

    productoSelect.addEventListener("change", () => {
      const nombre = productoSelect.value;
      inputPrecio.value = nombre ? PRECIOS[nombre] ?? "" : "";
    });

    formCarrito.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = productoSelect.value;
      const cantidad = parseInt(inputCantidad.value, 10) || 0;
      const precioUnit = PRECIOS[nombre];

      if (!nombre || !precioUnit || cantidad <= 0) {
        alert("Selecciona un producto y una cantidad válida.");
        return;
      }

      const total = precioUnit * cantidad;
      const fila = tablaCompraBody.insertRow();
      fila.innerHTML = `<td>${nombre}</td><td>${cantidad}</td><td>${precioUnit}</td><td>${total}</td>`;

      formCarrito.reset();
      inputPrecio.value = "";
    });
  }


  if (continuarBtn && formCliente) {
    continuarBtn.addEventListener("click", () => {
      formCliente.style.display = "block";
      continuarBtn.style.display = "none";
      formCliente.scrollIntoView({ behavior: "smooth" });
    });
  }

 
  if (formFinal) {
    formFinal.addEventListener("submit", (e) => {
      e.preventDefault();
      localStorage.setItem("compraExitosa", "true");
      window.location.href = "index.html";
    });
  }
});
