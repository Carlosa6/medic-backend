const { Schema, model, version } = require('mongoose')

const rolSchema = new Schema({
    name:String,
    description:String
},{
    versionKey:false
})

module.exports = model('Rol',rolSchema)
