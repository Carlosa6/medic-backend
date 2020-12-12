const jwt = require('jsonwebtoken')
const User = require('../model/User')

const verificarToken = async (req,res,next) => {
    try {
        const token = req.header['access-token'] //obtener el token por cabecera
        //si no existe el token
        if(!token) return res.status(403).json({error:true,message:"Fallo al encontrar el token! Acceso Denegado!"})
        
        //extraer lo hay dentro del token
        const secret = process.env.SECRET
        const decoded = jwt.verify(token,secret)
        req.userID = decoded.id

        const user = await User.findById(req.userID,{password:0})
        if(!user) return res.status(404).json({error:true,message:"El usuario no existe"})

        next()
    } catch (error) {
        return res.status(401).json({error:true,message:"No estas autorizado"})
    }
}

//MIDDLEWARE QUE VERIFICA QUE EL USUARIO TIENE EL ROL DE ADMIN
const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userID)
    const rol = await Rol.findById(user.rol)

    if (rol.name === "admin") {
        next();
        return;
    }

    return res.status(403).json({ message: 'Sólo el Administrador puede realizar esta operación' })
}

module.exports = {
    verificarToken,isAdmin
}