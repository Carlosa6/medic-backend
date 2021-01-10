const FichaMedica = require('../model/FichaMedica');
const TipoSangre = require('../model/TipoSangre');
const User = require('../model/User')


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
/****CODIFO ANGEL ****/
//Obtener usuario con sus fichas medicas
async function usuario_ficha() {
    let usuarios = await User.find().select({ "fichaMedica": 1, "_id": 1})
    let usuarios_con_ficha = []
    usuarios.forEach(x=>{
        if (x.fichaMedica.length>0) usuarios_con_ficha.push(x)
    })
    return usuarios_con_ficha
}

//Obtener usuario con una ficha para obtener datos generales
async function usuario_una_ficha() {
    let usuarios = await usuario_ficha()
    let id_fichas = []
    let ficha_medica_unica_por_usuario = []
    usuarios.forEach(x=>{
        let id_ficha = x.fichaMedica.pop()
        id_fichas.push(id_ficha)
    })
    id_fichas.forEach(async (x)=>{
        let ficha = await FichaMedica.findById(x).select({"tipoSangre":1})//.select({"tipoSangre":1,"seguroMedico":1})
        if (ficha != null) {
            console.log(ficha)
            ficha_medica_unica_por_usuario.push(ficha)
            //return ficha
        }

    })
    
    console.log(ficha_medica_unica_por_usuario)

    return usuarios
}


exports.charts1 = async (req,res)=>{
    
    let usuarios = await usuario_una_ficha()
    
    res.status(200).json(usuarios)


}
