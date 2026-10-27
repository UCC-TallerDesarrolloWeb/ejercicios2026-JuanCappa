
/**
 * Convierte entre metros, pulgadas, pies y yardas.
 * @method ConversorUnidades
 * @param {string} id - Unidad que se modificó.
 * @param {string} valor - Valor ingresado.
 * @returns {void} Actualiza los campos del formulario.
 */
const ConversorUnidades = (id, valor) => {
    let met, pul, pie, yar, metros, numero;

    valor = valor.trim().replace(",", ".");
    numero = Number(valor);

    if (valor === "" || !Number.isFinite(numero)) {
        alert("Ingresá un valor numérico válido.");
        met = pul = pie = yar = "";
    } else {
        // Convertimos primero a metros.
        if (id === "metro") {
            metros = numero;
        } else if (id === "pulgada") {
            metros = numero * 0.0254;
        } else if (id === "pie") {
            metros = numero * 0.3048;
        } else if (id === "yarda") {
            metros = numero * 0.9144;
        }

        // Calculamos todas las unidades.
        met = metros.toFixed(2);
        pul = (metros / 0.0254).toFixed(2);
        pie = (metros / 0.3048).toFixed(2);
        yar = (metros / 0.9144).toFixed(2);
    }

    // Actualizamos los campos al final.
    document.getElementById("metro").value = met;
    document.getElementById("pulgada").value = pul;
    document.getElementById("pie").value = pie;
    document.getElementById("yarda").value = yar;
};


/**
 * Convierte grados a radianes o radianes a grados.
 * @method convertirGradosRadianes
 * @param {string} id - ID del campo que cambió.
 * @param {string} valor - Número ingresado por el usuario.
 * @returns {void} Escribe el resultado en el otro campo.
 */
function convertirGradosRadianes(id, valor) {
    const numero = Number(valor);

    if (valor.trim() === "" || !Number.isFinite(numero)) {
        alert("Ingresaste un valor inválido en " + id);
        document.getElementById("grados").value = "";
        document.getElementById("radianes").value = "";
        return;
    }

    if (id === "grados") {
        document.getElementById("radianes").value =
            numero * Math.PI / 180;
    } else {
        document.getElementById("grados").value =
            numero * 180 / Math.PI;
    }
}

const mostrarOcultarDiv = (opcion) => {
    const div = document.getElementById("unDiv");

    if (opcion === "val_mostrar") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
};



/**
 * Muestra los detalles del producto seleccionado.
 * @param {number} index - Posición del producto en el array.
 * @returns {void}
 */
const mostrarDialogProducto = (index) => {
    const producto = productos[index];

    if (!producto) {
        return;
    }

    const contenido = document.getElementById("contenidoDetalle");

    contenido.innerHTML = `
        <h2>${producto.nombre}</h2>
        <p>${producto.description}</p>
        <p>Marca: ${producto.marca}</p>
        <p>Categoría: ${producto.categoria}</p>
        <p>Talles: ${producto.talle.join(", ")}</p>
        <p>Precio: $${producto.precio}</p>
    `;

    const dialog = document.getElementById("detalleProducto");
    dialog.showModal();
};


/**
 * Cierra el cuadro de diálogo del producto.
 * @returns {void}
 */
const cerrarDialogProducto = () => {
    const dialog = document.getElementById("detalleProducto");
    dialog.close();
};



/**
 * Realiza operaciones matemáticas y muestra el resultado
 * utilizando innerHTML.
 * @param {string} operacion - Operación seleccionada.
 * @returns {void}
 */
const calcularOperacion = (operacion) => {
    const campos = {
        suma: ["nums1", "nums2", "totalS"],
        resta: ["numr1", "numr2", "totalR"],
        multiplicacion: ["numm1", "numm2", "totalM"],
        division: ["numd1", "numd2", "totalD"]
    };

    const [id1, id2, idResultado] = campos[operacion];

    const valor1 = document.getElementById(id1).value.trim();
    const valor2 = document.getElementById(id2).value.trim();
    const resultado = document.getElementById(idResultado);

    if (valor1 === "" || valor2 === "") {
        resultado.innerHTML = "";
        return;
    }

    const num1 = Number(valor1.replace(",", "."));
    const num2 = Number(valor2.replace(",", "."));

    if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
        resultado.innerHTML = "Error";
        return;
    }

    let total;

    switch (operacion) {
        case "suma":
            total = num1 + num2;
            break;
        case "resta":
            total = num1 - num2;
            break;
        case "multiplicacion":
            total = num1 * num2;
            break;
        case "division":
            if (num2 === 0) {
                resultado.innerHTML = "Error";
                return;
            }
            total = num1 / num2;
            break;
    }

    resultado.innerHTML = total;
};

/**
 * Crea una tarjeta HTML por cada producto.
 * @returns {void}
 */
const renderizarProductos = () => {
    const catalogo = document.getElementById("catalogoProductos");

    let tarjetas = "";

    productos.forEach((producto, index) => {
        tarjetas += `
            <div class="producto-card">
                <img src="images/${producto.imagen}"
                     alt="${producto.nombre}">

                <h3>${producto.nombre}</h3>

                <p>Precio: $${producto.precio}</p>

                
                <button type="button"
                onclick="mostrarDialogProducto(${index})">
                Ver detalle de Producto
                </button>

                <button type="button"
                onclick="agregarAlCarrito(${index})">
                Agregar al carrito
                </button>

            </div>
        `;
    });

    catalogo.innerHTML = tarjetas;
};

/**
 * Agrega un producto al carrito y lo guarda en localStorage.
 * @param {number} index - Posición del producto en el array.
 * @returns {void}
 */
const agregarAlCarrito = (index) => {
    const producto = productos[index];

    if (!producto) {
        return;
    }

    // Recuperamos el carrito guardado.
    const carrito = JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

    // Agregamos el producto.
    carrito.push(producto);

    // Guardamos el carrito actualizado.
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(producto.nombre + " agregado al carrito");
};

/**
 * Muestra los productos guardados en el carrito.
 * @returns {void}
 */
const renderizarCarrito = () => {

    // Recuperamos los productos guardados.
    const carrito = JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

    const contenedor = document.getElementById("listaCarrito");
    const totalElemento = document.getElementById("totalCarrito");

    let html = "";
    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        totalElemento.innerHTML = "Total: $0";
        return;
    }

    // Recorremos los productos del carrito.
    carrito.forEach((producto) => {

        html += `
            <div class="producto-card">
                <h3>${producto.nombre}</h3>
                <p>Marca: ${producto.marca}</p>
                <p>Precio: $${producto.precio.toLocaleString("es-AR")}</p>
            </div>
        `;

        total += producto.precio;
    });

    // Mostramos el listado.
    contenedor.innerHTML = html;

    // Mostramos el total de la compra.
    totalElemento.innerHTML =
        "Total: $" + total.toLocaleString("es-AR");
};
