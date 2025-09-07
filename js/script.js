document.addEventListener("DOMContentLoaded", () => {
  // --- Mensaje de éxito en index ---
  const enIndex =
    location.pathname.endsWith("index.html") ||
    location.pathname.endsWith("/") ||
    location.pathname === "";
  if (enIndex && localStorage.getItem("compraExitosa")) {
    const msg = document.getElementById("mensajeExito");
    if (msg) msg.style.display = "block";
    localStorage.removeItem("compraExitosa");
  }

  // --- Elementos de compra.html ---
  const formCarrito = document.getElementById("formCarrito");
  const tablaCompraBody = document.getElementById("tablaCompra");
  const continuarBtn = document.getElementById("continuar");
  const formCliente = document.getElementById("formCliente");
  const formFinal = document.getElementById("formFinal");

  // --- Validadores ---
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

  // --- Lista de precios para compra ---
  const PRECIOS = {
    "Caña de Pescar": 25000,
    "Carrete Shimano": 40000,
    "Señuelo Rapala": 8000,
    "Línea Trenzada RUVADAS": 12000,
    "Anzuelos Pesca": 5000,
    "Caja Organizadora de Señuelos": 8000,
  };

  // --- Lógica del carrito (compra.html) ---
  if (formCarrito && tablaCompraBody) {
    const productoSelect = document.getElementById("producto");
    const inputPrecio = document.getElementById("precio");
    const inputCantidad = document.getElementById("cantidad");

    // Mostrar precio unitario al elegir producto
    productoSelect.addEventListener("change", () => {
      const nombre = productoSelect.value;
      inputPrecio.value = nombre ? PRECIOS[nombre] ?? "" : "";
    });

    // Agregar fila al resumen
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
      fila.innerHTML = `
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>$${precioUnit.toLocaleString("es-CL")}</td>
        <td>$${total.toLocaleString("es-CL")}</td>
      `;

      formCarrito.reset();
      inputPrecio.value = "";
    });
  }

  // --- Mostrar formulario de cliente (compra.html) ---
  if (continuarBtn && formCliente) {
    continuarBtn.addEventListener("click", () => {
      formCliente.style.display =
        formCliente.style.display === "none" || formCliente.style.display === ""
          ? "block"
          : "none";
      continuarBtn.style.display = "none";
      formCliente.scrollIntoView({ behavior: "smooth" });
    });
  }

  // --- Finalizar compra (compra.html) ---
  if (formFinal) {
    formFinal.addEventListener("submit", (e) => {
      e.preventDefault();
      localStorage.setItem("compraExitosa", "true");
      window.location.href = "index.html";
    });
  }

  // --- Panel de edición (productos.html) ---
  const editarBtn = document.getElementById("editarInventario");
  const formInventario = document.getElementById("formInventario");
  const gridProductos = document.querySelector(".productos .grid");

  if (editarBtn && formInventario && gridProductos) {
    editarBtn.addEventListener("click", () => {
      const oculto =
        formInventario.style.display === "none" ||
        formInventario.style.display === "";
      formInventario.style.display = oculto ? "block" : "none";
    });

    // Agregar producto a la grilla
    formInventario.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombreProd").value.trim();
      const desc = document.getElementById("descProd").value.trim();
      const precio = document.getElementById("precioProd").value.trim();
      const img = document.getElementById("imgProd").value.trim();

      if (!nombre || !desc || !precio || !img) {
        alert("Completa todos los campos.");
        return;
      }

      const precioNum = Number(precio);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${img}" alt="${nombre}">
        <h3>${nombre}</h3>
        <p>${desc}</p>
        <p><strong>$${(isNaN(precioNum) ? precio : precioNum.toLocaleString("es-CL"))}</strong></p>
      `;

      gridProductos.appendChild(card);

      formInventario.reset();
      formInventario.style.display = "none";

      card.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // --- Editar lista de productos en compra.html ---
const editarListaBtn = document.getElementById("editarListaBtn");
const formEditarLista = document.getElementById("formEditarLista");
const agregarProductoBtn = document.getElementById("agregarProductoBtn");
const productoSelect = document.getElementById("producto");

if (editarListaBtn && formEditarLista && agregarProductoBtn && productoSelect) {

editarListaBtn.addEventListener("click", () => {
  if (formEditarLista.style.display === "none") {
    formEditarLista.style.display = "block";
    editarListaBtn.textContent = "Guardar cambios";
  } else {
    formEditarLista.style.display = "none";
    editarListaBtn.textContent = "Editar lista de productos";
  }
});


  agregarProductoBtn.addEventListener("click", () => {
    const nombre = document.getElementById("nuevoProducto").value.trim();
    const precio = document.getElementById("nuevoPrecio").value.trim();

    if (!nombre || !precio) {
      alert("Debes ingresar nombre y precio del producto");
      return;
    }

    const option = document.createElement("option");
    option.value = nombre;
    option.textContent = nombre;
    option.dataset.precio = precio;

    productoSelect.appendChild(option);


    document.getElementById("nuevoProducto").value = "";
    document.getElementById("nuevoPrecio").value = "";
  });

  const inputPrecio = document.getElementById("precio");
  productoSelect.addEventListener("change", () => {
    const precio = productoSelect.options[productoSelect.selectedIndex].dataset.precio;
    inputPrecio.value = precio ? precio : "";
  });
}

});
