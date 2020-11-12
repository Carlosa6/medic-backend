const User = require("../model/User")

const authSignin = async (req, res) => {


    const userFound = await User.findOne({ email: req.body.email }).populate("rol")

    if (!userFound) return res.status(400).json({ error: true, message: "Usuario no existente" })

    const validPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!validPassword) return res.status(401).json({ error: true, message: "La contraseña es incorrecta" })

    req.usuario = userFound

    res.status(200).json({ user: req.usuario })

}

module.exports = { authSignin }