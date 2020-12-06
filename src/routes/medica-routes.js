const {Router} = require('express')
const medicCtrl = require('../controllers/medica-controller')
const validacion = require('../config/verificacion')
const {body} = require('express-validator')

const router = Router()

//crear ficha médica => /api/medic
router.post('/',[
    validacion.validacionTipoSangre,
    body('anio').isNumeric()
] , medicCtrl.createFichaMedica)

router.get('/usuario/:usuario', medicCtrl.listarFichaMedicaxUsuario)

router.get('/:id', medicCtrl.mostrarFichaxId)

module.exports = router