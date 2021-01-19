const router = require('express').Router()
const auth = require('../helpers/autenticacion')
const Busqueda = require('../model/Busqueda')


router.get('/', [
    auth.verificarToken, auth.isAdmin
], async (req, res) => {
    const usuariosReales = await Busqueda.find()
    res.status(200).json(usuariosReales)
})


router.get('/:campo/:valor', [
    auth.verificarToken, auth.isAdmin
], async (req, res) => {
    const { campo, valor } = req.params

    const userByCampo = await Busqueda.findOne({ [campo]: valor })

    if (!userByCampo) return res.status(400).json({ message: "El Usuario no existe" })

    res.status(200).json(userByCampo)
})

module.exports = router