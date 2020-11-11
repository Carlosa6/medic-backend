const { Schema, model } = require('mongoose')

//INFORMACIÓN IMPORTANTE
/*

- EXISTEN 2 TIPOS DE SEGURO DE SALUD: DEL ESTADO Y PRIVADOS 
- SEGUROS DEL ESTADO: Permiten recibir atención en Instituciones Prestadoras de Salud Pública (IPRESS)
    # Si pertenece a EsSalud, se podrán atender en los Centros de Salud de EsSalud
    # Si pertenece al régimen de las Fuerzas Armadas, sólo se podrá atender en sus Centros de Salud
    # Seguros públicos del Perú:
        + SIS
        + EsSalud
        + Seguro de las Fuerzas Armadas
        + Seguro de Salud de la Policía
- las EPS (Empresas Prestadoras de Salud) son empresas públicas o privadas diferentes a EsSalud
    # Existen 4 compañías en el Perú: Rimac, Mapfre, Sanitas, Pacífico

*/

const seguroMedicoSchema = new Schema({
    tipo:[ //PÚBLICO O PRIVADO
        String //SEGÚN EL TIPO, ALMACENA EL CORRESPONDIENTE: SIS, EsSalud, Rimac,etc
    ]
})

module.exports = model('SeguroMedico', seguroMedicoSchema)