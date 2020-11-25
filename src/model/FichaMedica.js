const { Schema, model } = require('mongoose')

// TODO: Considerar la creación de un Schema con este tipo de dato
const medicamentoHabitualSchema = new Schema({
    _id: false,
    nombre: String, //nombre de medicamento
    dosis: String, // ejm: 5mg
    cantidad: Number, //ejm: 3 veces
    periodo: String //ejm: por día
})

const seguroMedicoSchema = new Schema({
    UNMSM:{
        type:Boolean
    },
    MINSA:{
        type:Boolean
    },
    ESSALUD:{
        type:Boolean
    },
    EPS:[ //PÚBLICO O PRIVADO
        String //SEGÚN EL TIPO, ALMACENA EL CORRESPONDIENTE: SIS, EsSalud, Rimac,etc
    ]
})

const fichaSchema = new Schema({
    diagnostico: [String],
    tipoSangre: { //almacenará el _id del tipo de sangre correspondiente al usuario
        ref:"TipoSangre",
        type: Schema.Types.ObjectId
    },
    medicamentoHabitual: [medicamentoHabitualSchema],
    medicamentosAlergicos:[String], //["","",""]
    /*seguroMedico:{                                 //TODO: ANALIZAR
        ref:"SeguroMedico"
    }*/
    seguroMedico:seguroMedicoSchema,
    anio:{
        type:Number
    }
    
},{
    timestamps:true //fecha de creación y actualización
})

module.exports = model('FichaMedica',fichaSchema)