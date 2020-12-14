const {Router} = require('express')
const discapacidadCtrl = require('../controllers/discapacidad-controller')
const auth = require('../helpers/autenticacion')
const router = Router()

router.get('/',[
    auth.verificarToken,
    auth.isAdmin
], discapacidadCtrl.getDiscapacidades)

module.exports = router