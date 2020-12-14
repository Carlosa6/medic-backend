const { Schema, model, version } = require('mongoose')

const discapacidadSchema = new Schema({
    name:String,
},{
    versionKey:false
})

module.exports = model('Discapacidad',discapacidadSchema)
