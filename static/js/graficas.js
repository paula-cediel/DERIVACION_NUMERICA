
let graficaActual = null;

function dibujarGrafica(datos) {
    const canvas = document.getElementById('grafica');

    if (graficaActual) {
        graficaActual.destroy();
    }

    const puntos = datos.grafica.map(punto => ({
        x: punto.x,
        y: punto.y
    }));

    graficaActual = new Chart(canvas, {
        type: 'line',

        data: {
            datasets: [{
                label: 'f(x)',
                data: puntos,
                borderColor: '#d88db5',
                backgroundColor: 'rgba(216, 141, 181, 0.15)',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.2,
                fill: true
            }, {
                label: 'Punto de evaluación',
                data: [{
                    x: datos.x,
                    y: datos.fx
                }],
                borderColor: '#9c70bd',
                backgroundColor: '#9c70bd',
                pointRadius: 6,
                showLine: false
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    labels: {
                        color: '#805b76'
                    }
                }
            },

            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Valor de X'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'f(x)'
                    }
                }
            }
        }
    });
}
