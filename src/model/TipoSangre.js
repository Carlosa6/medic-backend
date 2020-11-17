const { Schema, model } = require('mongoose')

const tipoSangreSchema = new Schema({
    tipo:String,
    representaion:String,
},{
    versionKey:false
})

module.exports = model('TipoSangre',tipoSangreSchema)
