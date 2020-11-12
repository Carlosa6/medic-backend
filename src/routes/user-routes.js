const { Router } = require('express')
const userCtrl = require('../controllers/user-controller')
const { body } = require('express-validator')
const router = Router()

router.post('/', [
    body('codigo').not().isEmpty().isLength({ max: 8 }),
    body('nombres').not().isEmpty().trim().escape(),
    body('apellidos').not().isEmpty().trim().escape(),
    body('dni').not().isEmpty().isLength({max:8}),
    body('email').not().isEmpty().isEmail().normalizeEmail(),
    body('password').not().isEmpty().isLength({min:6}),
    body('direccion').trim().escape(),
    body('telefono').isLength({max:9})
], userCtrl.createUser)

module.exports = router