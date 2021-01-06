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

    //cantidad de fichas médicas por año
    let cantidadFichasxAnio = await FichaMedica.aggregate([
        {
            $group: {
                _id: '$anio',
                count: { $sum: 1 }
            }
        }
    ])


    let tiposDeSangre = await TipoSangre.find({}, { tipo: 0 })
    //Devuelve: [{_id:'dsd3fdfdf',representation:'A+'},{...},...] 8 documentos
    let tiposanio = await tipoSangrexAnio(2017)

    let representacion = []

    for(let tiposSng in tiposDeSangre){
        let currentId = tiposDeSangre[tiposSng]._id
        if(tiposanio.some(obj => JSON.stringify(obj._id) === JSON.stringify(currentId))){
            representacion.push(tiposDeSangre[tiposSng].representation)
        }
    }
    console.log(representacion)
    console.log(tiposanio)
    

}

