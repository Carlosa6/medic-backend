const {Router} = require('express')
const rolCtrl = require('../controllers/rol-controller')
const auth = require('../helpers/autenticacion')
const {body} = require('express-validator')
const router = Router()

router.get('/',[
    // auth.verificarToken,
    // auth.isAdmin
], rolCtrl.getRols)

router.post('/',[
    auth.verificarToken,
    auth.isAdmin
],rolCtrl.postRol)

router.get('/:id',[
    auth.verificarToken,
    auth.isAdmin
], rolCtrl.getRolById)

router.delete('/:id',[
    auth.verificarToken,
    auth.isAdmin
],rolCtrl.deleteRol)

router.put('/:id',[
    auth.verificarToken,
    auth.isAdmin
],rolCtrl.updateRol)

module.exports = router