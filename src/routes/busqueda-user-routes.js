const router = require('express').Router()
const auth = require('../helpers/autenticacion')
const Busqueda = require('../model/Busqueda')


router.get('/', async (req,res) => {
    const usuariosReales = await Busqueda.find()
    res.status(200).json(usuariosReales)
})
router.get('/:dni', async (req,res) => {
    const userByDni = await Busqueda.findOne({dni:req.params.dni})

    if(!userByDni) return res.status(400).json({message:"El Usuario no existe"})

    res.status(200).json(userByDni)
})

module.exports = router