
/*
    CALCULOS.JS
    Motor matemático de Derivación Numérica.
    Reemplaza los cálculos que anteriormente realizaba Python.
*/

// Funciones matemáticas permitidas
const funcionesPermitidas = [
    'sin',
    'cos',
    'tan',
    'exp',
    'log',
    'sqrt',
    'abs'
];


// Evalúa una función para un valor específico de X
function evaluarFuncion(funcion, valorX) {
    const resultado = funcion.evaluate({
        x: valorX
    });

    if (typeof resultado !== 'number' || !Number.isFinite(resultado)) {
        throw new Error('La función no está definida en ese punto.');
    }

    return resultado;
}


// Valida la expresión matemática ingresada
function validarFuncion(texto) {

    const expresion = texto
        .trim()
        .replace(/\*\*/g, '^')
        .replace(/\bX\b/g, 'x');

    if (!expresion) {
        throw new Error('Escribe una función matemática.');
    }

    const permitidos = /^[0-9x+\-*/().\s^a-zA-Z]+$/;

    if (!permitidos.test(expresion)) {
        throw new Error('La función contiene caracteres no permitidos.');
    }

    const nombres = expresion.match(/[a-zA-Z]+/g) || [];

    for (const nombre of nombres) {
        if (nombre !== 'x' && !funcionesPermitidas.includes(nombre)) {
            throw new Error('Función matemática no reconocida: ' + nombre);
        }
    }

    try {
        return math.parse(expresion);
    } catch (error) {
        throw new Error('No se pudo interpretar la función matemática.');
    }
}


// FUNCIÓN PRINCIPAL DE CÁLCULO
function calcularDerivada(datos) {

    const funcionTexto = datos.funcion.trim();
    const x = Number(datos.x);
    const h = Number(datos.h);
    const metodo = datos.metodo;

    // Validaciones de entrada
    if (!Number.isFinite(x)) {
        throw new Error('El valor de X no es válido.');
    }

    if (!Number.isFinite(h) || h <= 0) {
        throw new Error('El valor de H debe ser mayor que cero.');
    }

    if (h > 1e6) {
        throw new Error('El valor de H es demasiado grande.');
    }

    // Validar y preparar la función
    const expresion = validarFuncion(funcionTexto);

    const funcion = expresion.compile();

    // Evaluar los puntos necesarios
    const fx = evaluarFuncion(funcion, x);
    const adelante = evaluarFuncion(funcion, x + h);
    const atras = evaluarFuncion(funcion, x - h);

    let resultado;
    let formula;

    // MÉTODOS DE DERIVACIÓN NUMÉRICA

    if (metodo === 'adelante') {

        resultado = (adelante - fx) / h;

        formula = '(f(x+h) - f(x)) / h';

    } else if (metodo === 'atras') {

        resultado = (fx - atras) / h;

        formula = '(f(x) - f(x-h)) / h';

    } else if (metodo === 'central') {

        resultado = (adelante - atras) / (2 * h);

        formula = '(f(x+h) - f(x-h)) / (2h)';

    } else {

        throw new Error('Método de derivación no válido.');

    }

    // DERIVADA EXACTA
    let derivada;
    let valorExacto;

    try {

        derivada = math.derivative(expresion, 'x');

        valorExacto = evaluarFuncion(
            derivada.compile(),
            x
        );

    } catch (error) {

        throw new Error(
            'No se pudo obtener la derivada exacta de esta función.'
        );

    }

    // Validar resultados
    if (!Number.isFinite(resultado)) {
        throw new Error('No se pudo obtener un resultado válido.');
    }

    // ERROR ABSOLUTO
    const error = Math.abs(valorExacto - resultado);


    // TABLA DE VALORES
    const tabla = [];

    for (let i = -5; i <= 5; i++) {

        const punto = x + i * h;

        let valor = null;

        try {
            valor = evaluarFuncion(funcion, punto);
        } catch (error) {
            valor = null;
        }

        tabla.push({
            x: punto,
            fx: valor
        });

    }


    // DATOS PARA LA GRÁFICA
    const amplitud = Math.max(Math.abs(h) * 5, 2);

    const grafica = [];

    for (let i = 0; i <= 80; i++) {

        const punto = x - amplitud +
            (2 * amplitud * i / 80);

        try {

            const valor = evaluarFuncion(funcion, punto);

            grafica.push({
                x: punto,
                y: valor
            });

        } catch (error) {
            // Se omiten puntos donde la función no está definida.
        }

    }


    // DEVOLVER TODOS LOS RESULTADOS
    return {

        funcion: expresion.toString(),

        x: x,

        h: h,

        metodo: metodo,

        formula: formula,

        fx: fx,

        fx_adelante: adelante,

        fx_atras: atras,

        resultado: resultado,

        derivada_exacta: derivada.toString(),

        valor_exacto: valorExacto,

        error: error,

        tabla: tabla,

        grafica: grafica

    };

}
