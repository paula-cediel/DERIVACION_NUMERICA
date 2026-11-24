
const STORAGE_KEY = "historialDerivadas";

function obtenerHistorial() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function guardarCalculo(calculo) {
    const historial = obtenerHistorial();

    historial.unshift({
        ...calculo,
        fecha: new Date().toLocaleString()
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));
}

function eliminarCalculo(indice) {
    const historial = obtenerHistorial();

    historial.splice(indice, 1);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));
}

function limpiarHistorial() {
    localStorage.removeItem(STORAGE_KEY);
}

function mostrarHistorial() {
    const contenedor = document.getElementById('listaHistorial');
    const historial = obtenerHistorial();

    if (!historial.length) {
        contenedor.innerHTML = '<p class="ayuda">Todavía no tienes cálculos guardados.</p>';
        return;
    }

    contenedor.innerHTML = historial.map((item, indice) => `
        <div class="historial-item">
            <strong>${item.funcion}</strong><br>
            X: ${item.x} | H: ${item.h}<br>
            Método: ${item.metodo}<br>
            Resultado: ${item.resultado}<br>
            <small>${item.fecha}</small>
            <button type="button" onclick="eliminarDelHistorial(${indice})">
                Eliminar
            </button>
        </div>
    `).join('');
}

function eliminarDelHistorial(indice) {
    eliminarCalculo(indice);
    mostrarHistorial();
}
