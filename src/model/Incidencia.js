const {Schema, model}= require('mongoose')

const Incidencia = Schema({
    titulo : {type:String},
    descripcion : {type:String},
    accion : {type:String},
    fecha : Date,
},{
    timestamps:true
})

module.exports = model('Incidencia',Incidencia)