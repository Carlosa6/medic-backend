const { ROLES, TIPO_SANGRE } = require('../libs/generals')
const User = require('../model/User')

//MIDDLEWARE QUE VERIFICA EL CORREO,CÓDIGO Y DNI DEL NUEVO USUARIO. EMAIL,DNI Y CÓDIGO ÚNICO
const checkDuplicado = async (req, res, next) => {

    //BUSCAR POR CÓDIGO
    const userCodigo = await User.findOne({ codigo: req.body.codigo })
    //SI YA EXISTE
    if (userCodigo) return res.status(400).json({ error: true, message: "El usuario ya existe" })

    //BUSCAR POR CORREO
    const userEmail = await User.findOne({ email: req.body.email })
    //si ya existe
    if (userEmail) return res.status(400).json({ error: true, message: "El correo electrónico del usuario ya existe" })

    //BUSCAR POR DNI
    const userDni = await User.findOne({ dni: req.body.dni });
    //si ya existe
    if (userDni) return res.status(400).json({ error: true, message: "El Número de DNI ya existe" })

    next()
}

//MIDDLEWARE QUE VERIFICA EL ROL QUE SE ASIGNA EL USUARIO
const verificarRol = (req, res, next) => {
    if (req.body.rol) {
        if (!ROLES.includes(req.body.rol)) {
            return res.status(400).json({ error: true, message: `El rol ${req.body.rol} no existe` })
        }
    }
    next();
}

const validacionTipoSangre = (req, res, next) => {
    if (req.body.tipoSangre) {
        if (!TIPO_SANGRE.includes(req.body.tipoSangre)) {
            return res.status(400).json({ error: true, message: `El tipo de sangre ${req.body.tipoSangre} no es válido` })
        }
    }
    next();
}

module.exports = {
    checkDuplicado, verificarRol,validacionTipoSangre
}
