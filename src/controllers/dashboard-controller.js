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
async function usuario_una_ficha(anio=0) {
    let usuarios = await usuario_ficha()
    let id_fichas = []
    let ficha_medica_unica_por_usuario = []
    usuarios.forEach(x=>{
        let id_ficha = x.fichaMedica[0]
        id_fichas.push(id_ficha)
    })
    await Promise.all(
        id_fichas.map(async (x)=>{
            let ficha
            if (anio !=0){
                ficha = await FichaMedica.find({_id:x,anio:anio}).select({"tipoSangre":1,"seguroMedico":1})//.select({"tipoSangre":1,"seguroMedico":1})
            }else{
                ficha = await FichaMedica.find({_id:x}).select({"tipoSangre":1,"seguroMedico":1})//.select({"tipoSangre":1,"seguroMedico":1})
            }
            if (ficha[0] != undefined) {
                ficha_medica_unica_por_usuario.push(ficha[0])
                //return ficha
            }
            
        })
        )
        
    
    return ficha_medica_unica_por_usuario
}

//Obtener cantidades por tipo de sangre
async function estadistica_tipo_asngre() {
    let usuarios = await usuario_una_ficha()

    let tipos_sangre = await TipoSangre.find().select({"_id":1,"representation":1})
    let sangre={}
    tipos_sangre.forEach(x=>{
        cantidad = 0
        usuarios.forEach(y=>{
            if (JSON.stringify(x._id) == JSON.stringify(y.tipoSangre)){
                cantidad++
            }
        })
        sangre[x.representation]=cantidad
    })
    
    return sangre
}

//Obtener cantidades por seguro medico del año pasado (2020)
async function estadistica_seguro_medico() {
    let usuarios = await usuario_una_ficha(2020)
    let seguros_validos=[]
    usuarios.forEach(x=>{

    if (x.seguroMedico == undefined){
        console.log(x)
    }else{
        seguros_validos.push(x.seguroMedico)
    }

   })
   let estadistica = {
       '0': 0,
       '1': 0,
       'Mas de 1': 0,
   }

   seguros_validos.forEach(x=>{
    cantidad = 0
    if (x.UNMSM) cantidad++
    if (x.MINSA || x.ESSALUD) cantidad++

    switch (cantidad) {
        case 0:
            estadistica['0']++
            break;
        case 1:
            estadistica['1']++
            break;
        case 2:
            estadistica['Mas de 1']++
            break;
    }
    
   })

   console.log(estadistica)

   return estadistica
}


exports.charts1 = async (req,res)=>{
    
    let usuarios = await estadistica_seguro_medico()
    console.log(usuarios.length)
    res.status(200).json(usuarios)


}
