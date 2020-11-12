const { ROLES } = require('../libs/generals')
const Rol = require('../model/Rol')
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

//MIDDLEWARE QUE VERIFICA QUE EL USUARIO TIENE EL ROL DE ADMIN
const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.usuario._id)
    const rol = await Rol.findById(user.rol)

    if (rol.name === "admin") {
        next();
        return;
    }

    return res.status(403).json({ message: 'Sólo el Administrador puede realizar esta operación' })
}

module.exports = {
    checkDuplicado, isAdmin
}
