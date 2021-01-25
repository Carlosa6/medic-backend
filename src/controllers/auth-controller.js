const User = require("../model/User")
const jwt = require('jsonwebtoken')

const authSignin = async (req, res) => {

    const userFound = await User.findOne({ email: req.body.email }).populate("rol")

    if (!userFound) return res.status(400).json({ error: true, message: `No existe una cuenta registrada con ${req.body.email}` })

    const validPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!validPassword) return res.status(401).json({ error: true, message: "La contraseña es incorrecta" })

    const secret = process.env.SECRET
    const token = jwt.sign({ id: userFound._id }, secret, {
        expiresIn: 86400
    })

    res.json({ userFound, token })

}

module.exports = { authSignin }