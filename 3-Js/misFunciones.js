/**
 * Convierte una longitud entre metros, pulgadas, pies y yardas.
 * @method ConversorUnidades
 * @param {string} id - ID del campo que cambió.
 * @param {string} valor - Número ingresado por el usuario.
 * @returns {void} Muestra el resultado en los otros campos.
 */
function ConversorUnidades(id, valor) {
    const unidades = ["metro", "pulgada", "pie", "yarda"];

    const factores = {
        metro: 1,
        pulgada: 0.0254,
        pie: 0.3048,
        yarda: 0.9144
    };

    const numero = Number(valor);

    if (valor.trim() === "" || !Number.isFinite(numero)) {
        alert("Ingresaste un valor inválido en " + id);

        unidades.forEach(unidad => {
            document.getElementById(unidad).value = "";
        });
        return;
    }

    const metros = numero * factores[id];

    unidades.forEach(unidad => {
        if (unidad !== id) {
            document.getElementById(unidad).value =
                metros / factores[unidad];
        }
    });
}

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