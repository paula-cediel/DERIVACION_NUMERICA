
// ELEMENTOS DEL HTML
const formulario = document.getElementById('formulario');
const resultados = document.getElementById('resultados');
const mensaje = document.getElementById('mensaje');
const boton = document.getElementById('btnCalcular');


// EVENTO PARA CALCULAR LA DERIVADA
formulario.addEventListener('submit', (evento) => {

    evento.preventDefault();

    const datos = {
        funcion: document.getElementById('funcion').value.trim(),
        x: document.getElementById('valorX').value,
        h: document.getElementById('valorH').value,
        metodo: document.getElementById('metodo').value
    };


    // VALIDAR CAMPOS
    if (!datos.funcion || datos.x === '' || datos.h === '') {
        mensaje.textContent = 'Completa todos los campos.';
        return;
    }

    if (Number(datos.h) <= 0) {
        mensaje.textContent = 'El valor de H debe ser mayor que cero.';
        return;
    }


    // ACTIVAR ESTADO DE CARGA
    boton.disabled = true;
    boton.textContent = 'Calculando...';
    mensaje.textContent = '';


    try {

        // VERIFICAR QUE EL MOTOR MATEMÁTICO ESTÉ CARGADO
        if (typeof calcularDerivada !== 'function') {
            throw new Error('No se encontró el archivo calculos.js.');
        }


        // REALIZAR EL CÁLCULO DIRECTAMENTE CON JAVASCRIPT
        const resultado = calcularDerivada(datos);


        // MOSTRAR LOS RESULTADOS
        mostrarResultados(resultado);


        // GUARDAR EL CÁLCULO EN EL HISTORIAL
        guardarCalculo({
            funcion: resultado.funcion,
            x: resultado.x,
            h: resultado.h,
            metodo: resultado.metodo,
            resultado: resultado.resultado
        });


        // ACTUALIZAR HISTORIAL
        mostrarHistorial();


        // MOSTRAR LA SECCIÓN DE RESULTADOS
        resultados.classList.remove('oculto');

        mensaje.textContent = '¡Cálculo realizado correctamente! ♡';


        // DESPLAZAR HACIA LOS RESULTADOS
        resultados.scrollIntoView({
            behavior: 'smooth'
        });


    } catch (error) {

        mensaje.textContent = error.message || 'Ocurrió un error al realizar el cálculo.';

    } finally {

        // RESTAURAR EL BOTÓN
        boton.disabled = false;
        boton.textContent = '♡ Calcular derivada';

    }

});



// FUNCIÓN PARA MOSTRAR LOS RESULTADOS
function mostrarResultados(datos) {

    document.getElementById('resultado').textContent =
        Number(datos.resultado).toPrecision(10);

    document.getElementById('funcionResultado').textContent =
        datos.funcion;

    document.getElementById('derivadaExacta').textContent =
        datos.derivada_exacta;

    document.getElementById('valorExacto').textContent =
        Number(datos.valor_exacto).toPrecision(10);

    document.getElementById('error').textContent =
        Number(datos.error).toExponential(5);


    // MOSTRAR PROCEDIMIENTO MATEMÁTICO
    document.getElementById('procedimiento').innerHTML =
        obtenerProcedimiento(datos);


    // CONSTRUIR TABLA DE VALORES
    const cuerpoTabla = document.getElementById('tablaValores');

    cuerpoTabla.innerHTML = '';

    datos.tabla.forEach(fila => {

        const tr = document.createElement('tr');

        const tdX = document.createElement('td');
        const tdFx = document.createElement('td');

        tdX.textContent = Number(fila.x).toFixed(6);

        tdFx.textContent = fila.fx === null
            ? 'No definida'
            : Number(fila.fx).toPrecision(8);

        tr.appendChild(tdX);
        tr.appendChild(tdFx);

        cuerpoTabla.appendChild(tr);

    });


    // DIBUJAR GRÁFICA
    dibujarGrafica(datos);

}



// BOTÓN PARA BORRAR EL HISTORIAL
document.getElementById('limpiarHistorial')
    .addEventListener('click', () => {

        if (confirm('¿Deseas borrar todo el historial?')) {

            limpiarHistorial();

            mostrarHistorial();

        }

    });



// MOSTRAR HISTORIAL AL ABRIR LA APLICACIÓN
mostrarHistorial();
