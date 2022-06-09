const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    codigo: {
        type: String,
        unique: true
    },
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    dni: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    direccion: String,
    telefono: String,
    sexo: String,
    foto: String,
    rol: {
        ref: "Rol",
        type: Schema.Types.ObjectId
    },
    fichaMedica: [{
        ref: "FichaMedica",
        type: Schema.Types.ObjectId
    }],
    incidencia: [{
        ref: "Incidencia",
        type: Schema.Types.ObjectId
    }],
    discapacidad: {
        ref: "Discapacidad",
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true
})

//hashear contraseña
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

//comparar contraseña de la bd y la que se recibe desde el req.body
userSchema.statics.comparePassword = async (password, receivePassword) => {
    return await bcrypt.compare(password, receivePassword)
}

module.exports = model('User', userSchema)
