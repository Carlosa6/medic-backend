const {Router} = require('express')
const medicCtrl = require('../controllers/medica-controller')
const {body} = require('express-validator')
const auth = require('../helpers/autenticacion')

const router = Router()

//crear ficha médica => /api/medic. Sólo el admin puede crear ficha médica
router.post('/',[
    body('anio').isNumeric()
] ,[
    auth.verificarToken,
    auth.isAdmin
], medicCtrl.createFichaMedica)

//MOsttrar la ficha médica por usuario. Validar el token
router.get('/usuario/:usuario',[
    auth.verificarToken
], medicCtrl.listarFichaMedicaxUsuario)

//mostrar ficha médica por id. Validar el token
router.get('/:id',[
    auth.verificarToken
], medicCtrl.mostrarFichaxId)

module.exports = router