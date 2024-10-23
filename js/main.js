let notas = [];

function agregarNota() {
    const notaInput = document.getElementById('notaIndividual');
    const nota = parseFloat(notaInput.value);
    
    if (!isNaN(nota) && nota >= 0) {
        notas.push(nota);
        actualizarListaNotas();
        actualizarGrafico(notas, obtenerNotaReferencia());
        notaInput.value = '';
    } else {
        alert("Por favor ingrese una nota válida.");
    }
}

function actualizarListaNotas() {
    const listaNotasDiv = document.getElementById('listaNotas');
    listaNotasDiv.innerHTML = '';  

    if (notas.length > 0) {
        listaNotasDiv.innerHTML = '<h3>Notas ingresadas:</h3>';
        notas.forEach((nota, index) => {
            listaNotasDiv.innerHTML += `<p>Nota ${index + 1}: ${nota.toFixed(2)}</p>`;
        });
    }
}

function obtenerNotaReferencia() {
    const notaReferencia = parseFloat(document.getElementById('notaReferencia').value);
    if (isNaN(notaReferencia) || notaReferencia <= 0) {
        alert("Por favor ingrese una nota de referencia válida.");
        return null;
    }
    return notaReferencia;
}

function calcularPromedio() {
    if (notas.length > 0) {
        const sumaNotas = notas.reduce((acumulador, nota) => acumulador + nota, 0);
        return sumaNotas / notas.length;
    }
    return 0;
}

function mostrarResultados(promedio, notaReferencia) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';

    if (promedio >= notaReferencia) {
        resultadosDiv.textContent = `FELICIDADES! Con un promedio de ${promedio.toFixed(2)}, estás promocionado.`;
        resultadosDiv.className = 'resultados success';
    } else {
        resultadosDiv.textContent = `Lo siento, con un promedio de ${promedio.toFixed(2)}, no alcanzaste la nota de promoción.`;
        resultadosDiv.className = 'resultados error';
    }
}

let chart;

function actualizarGrafico(notas, notaReferencia) {
    const ctx = document.getElementById('graficoNotas').getContext('2d');

    if (chart) {
        chart.destroy();
    }
    
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: notas.map((_, index) => `Nota ${index + 1}`),
            datasets: [
                {
                    label: 'Notas ingresadas',
                    data: notas,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Nota de promoción',
                    data: Array(notas.length).fill(notaReferencia),
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
}

function ejecutarCalculo() {
    const notaReferencia = obtenerNotaReferencia();
    
    if (notaReferencia !== null) {
        const promedio = calcularPromedio();
        mostrarResultados(promedio, notaReferencia);
    }
}

document.getElementById('agregarNota').addEventListener('click', agregarNota);
document.getElementById('calcularPromedio').addEventListener('click', ejecutarCalculo);
