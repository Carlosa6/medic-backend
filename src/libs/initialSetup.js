const Rol = require('../model/Rol')

const creacionRoles = async () => {
    try {
        const count = await Rol.estimatedDocumentCount(); //obtener la cantidad de documentos

        //si ya se crearon los roles, retornar
        if(count > 0) return;

        //si no hay roles, crearlos
        //ejecutar las promesas al mismo tiempo
        const values = await Promise.all([
            new Rol({name: "user"}).save(),
            new Rol({name:"admin"}).save()
        ])
        console.log(values)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {creacionRoles}