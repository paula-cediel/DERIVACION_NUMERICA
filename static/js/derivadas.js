
function obtenerProcedimiento(datos) {
    const x = datos.x;
    const h = datos.h;
    const fx = datos.fx;
    const adelante = datos.fx_adelante;
    const atras = datos.fx_atras;

    let pasos = '';

    if (datos.metodo === 'adelante') {
        pasos = `
            <strong>Diferencia hacia adelante</strong><br>
            Fórmula: ${datos.formula}<br>
            f(x) = ${fx}<br>
            f(x+h) = ${adelante}<br>
            Sustituyendo:<br>
            (${adelante} - ${fx}) / ${h}<br>
            Resultado = ${datos.resultado}
        `;
    }

    else if (datos.metodo === 'atras') {
        pasos = `
            <strong>Diferencia hacia atrás</strong><br>
            Fórmula: ${datos.formula}<br>
            f(x) = ${fx}<br>
            f(x-h) = ${atras}<br>
            Sustituyendo:<br>
            (${fx} - ${atras}) / ${h}<br>
            Resultado = ${datos.resultado}
        `;
    }

    else if (datos.metodo === 'central') {
        pasos = `
            <strong>Diferencia central</strong><br>
            Fórmula: ${datos.formula}<br>
            f(x+h) = ${adelante}<br>
            f(x-h) = ${atras}<br>
            Sustituyendo:<br>
            (${adelante} - ${atras}) / (2 × ${h})<br>
            Resultado = ${datos.resultado}
        `;
    }

    return pasos;
}
