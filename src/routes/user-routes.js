const { Router } = require('express')
const userCtrl = require('../controllers/user-controller')
const { body } = require('express-validator')
const config = require('../config/verificacion')
const router = Router()

//crear usuarios => POST /api/users 
router.post('/', [
    body('codigo').not().isEmpty().isLength({ max: 8 }),
    body('nombres').not().isEmpty().trim().escape(),
    body('apellidos').not().isEmpty().trim().escape(),
    body('dni').not().isEmpty().isLength({ max: 8 }),
    body('email').not().isEmpty().isEmail().normalizeEmail(),
    body('password').not().isEmpty().isLength({ min: 6 }),
    body('direccion').trim().escape(),
    body('telefono').isLength({ max: 9 })
], [config.checkDuplicado, config.verificarRol], userCtrl.createUser)

//listar usuarios => GET /api/users
router.get('/', userCtrl.getUsers)

//listar info de un usuario por codigo
router.get('/:dniuser',userCtrl.getUserByCodigo)

module.exports = router