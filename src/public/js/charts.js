// CHART 1
const chart1 = document.getElementById('chart1')

let grafA = {
    x: aniosFichaMedica,
    y: cantidadesFichaMedica,
    type: 'bar',
    marker:{
        color:'#b82e7ae8'
    }
}

let data = [grafA]

const layout = {
    title: 'Fichas Médicas por Año'
}

Plotly.plot(chart1, data, layout)

///////////////////////////////////////

//CHART 2: Cantidad de usuarios por tipo de sangre, dado un año
//agregar al select los años
const chart2 = document.getElementById('chart2')
const anios = document.getElementById('anios')




