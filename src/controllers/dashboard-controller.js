const FichaMedica = require('../model/FichaMedica');
const TipoSangre = require('../model/TipoSangre');

//devuelve la cantidad de usuarios por tipo de sangre, dado un año
async function tipoSangrexAnio(anio){
    let tiposangre = await FichaMedica.aggregate([
        {
            $match:{
                anio:anio
            }
        },
        {   $group:{
                _id:'$tipoSangre',
                count:{$sum:1}
            }
        }
    ])
    return tiposangre
}

//usuarios por seguro médico, dado el año
async function seguroMedicoxAnio(anio){
    let jiji = await FichaMedica.aggregate([
        {
            $match:{
                anio:2019
            }
        },
        {
            $group:{
                _id:'$seguroMedico'
            }
        }
    ])
    return jiji
}

exports.charts = async (req, res) => {

    //cantidad de fichas médicas por año
    let cantidadFichasxAnio = await FichaMedica.aggregate([
        {
            $group:{
                _id:'$anio',
                count:{$sum:1}
            }
        }
    ])
    //Devuelve:
    // [
    //     { _id: 2020, count: 1 },
    //     { _id: 2019, count: 4 },
    //     { _id: 2023, count: 4 },
    //     { _id: 2018, count: 1 },
    //     { _id: 2017, count: 1 }
    // ]
    let aniosficha = []
    let cantidadesficha = []
    cantidadFichasxAnio.forEach(gg => {
        aniosficha.push(gg._id)
        cantidadesficha.push(gg.count)
    })

    let allTiposSangrexAnio = await tipoSangrexAnio(2019)
    // Devuelve
    // [ { _id: 5fac9d0d3b441334a01a6291, count: 4 } ]
    
    let tiposDeSangre = await TipoSangre.find({},{tipo:0})
    //Devuelve: [{_id:'dsd3fdfdf',representation:'A+'},{...},...] 8 documentos
    
    //////
    let seguro = await seguroMedicoxAnio(2019)
    console.log(seguro)

    res.render('chart',{
        aniosFichaMedica: JSON.stringify(aniosficha), //[2017,2018,...]
        cantidadesFichaMedica: JSON.stringify(cantidadesficha), //[4,67,34,...]
    })
    

}

exports.probando = async (req,res) => {

    
    
    
}
