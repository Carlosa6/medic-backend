const FichaMedica = require('../model/FichaMedica');
const TipoSangre = require('../model/TipoSangre');

//devuelve la cantidad de usuarios por tipo de sangre, dado un año
async function tipoSangrexAnio(anio) {
    let tiposangre = await FichaMedica.aggregate([
        {
            $match: {
                anio: anio
            }
        },
        {
            $group: {
                _id: '$tipoSangre',
                count: { $sum: 1 }
            }
        },
        {
            $sort:{
                count:-1
            }
        }
    ])
    return tiposangre
}

//usuarios por seguro médico, dado el año
async function seguroMedicoxAnio(anio) {
    let jiji = await FichaMedica.aggregate([
        {
            $match: {
                anio: 2019
            }
        },
        {
            $group: {
                _id: '$seguroMedico',
                count: { $sum: 1 }
            }
        }
    ])
    return jiji
}

exports.charts = async (req, res) => {

    let arrayEnviar = []

    //cantidad de fichas médicas por año
    let cantidadFichasxAnio = await FichaMedica.aggregate([
        {
            $group: { //Agrupar por año
                _id: '$anio',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { //Los años obtenidos ordenarlos descendientemente
                _id: -1
            }
        },
        { //Devolver sólo los últimos 5 años
            $limit: 5
        }
    ])
    arrayEnviar.push({ cantidadFichasxAnio: cantidadFichasxAnio })

    //TIPOS DE SANGRE
    let tiposDeSangre = await TipoSangre.find({}, { tipo: 0 })
    //Devuelve: [{_id:'dsd3fdfdf',representation:'A+'},{...},...] 8 documentos
    let tiposanio = await tipoSangrexAnio(2020)
    
        // [
        // { _id: 5fac9d0d3b441334a01a6295, count: 1 },
        // { _id: 5fac9d0d3b441334a01a6293, count: 2 }
        // ]
    
    let representacion = []

    for (let tiposSng in tiposDeSangre) {
        let currentId = tiposDeSangre[tiposSng]._id
        if (tiposanio.some(obj => JSON.stringify(obj._id) === JSON.stringify(currentId))) {
            representacion.push({
                represt:tiposDeSangre[tiposSng].representation
            })
        }
    }
    
    tiposanio.forEach(g => {
        let cant = g.count
        representacion.some(obj => {
            obj.cantidad = cant
        })
    })

    console.log(tiposanio)
    console.log(representacion)
    // console.log(tiposanio)
    // console.log(cantidadFichasxAnio)

    // res.status(200).json(arrayEnviar)

}

