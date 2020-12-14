const {Router} = require('express')
const rolCtrl = require('../controllers/rol-controller')
const auth = require('../helpers/autenticacion')
const {body} = require('express-validator')
const router = Router()

router.get('/',[
    auth.verificarToken,
    auth.isAdmin
], rolCtrl.getRols)

module.exports = router