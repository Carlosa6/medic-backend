const Rol = require('../model/Rol');
const TipoSangre = require('../model/TipoSangre');

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

const creacionTipoSangre = async () => {
    try {
        const count = await TipoSangre.estimatedDocumentCount(); //obtener la cantidad de documentos

        if(count > 0) return;

        const values = await Promise.all([
            new TipoSangre({tipo:"Opositivo"}).save(),
            new TipoSangre({tipo:"Onegativo"}).save(),
            new TipoSangre({tipo:"Apositivo"}).save(),
            new TipoSangre({tipo:"Anegativo"}).save(),
            new TipoSangre({tipo:"Bpositivo"}).save(),
            new TipoSangre({tipo:"Bnegativo"}).save(),
            new TipoSangre({tipo:"ABpositivo"}).save(),
            new TipoSangre({tipo:"ABnegativo"}).save()
        ])
        console.log(values)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {creacionRoles,creacionTipoSangre}