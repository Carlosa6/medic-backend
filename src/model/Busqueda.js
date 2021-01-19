const {Schema,model} = require('mongoose')

const bschema = new Schema({
    _id:Number,
    dni:String,
    codigo:String,
    nombres:String,
    apellidos:String,
    email:String,
    password:String,
    telefono:String
})

module.exports = model('Busqueda',bschema)