const {Router} = require('express')
const medicCtrl = require('../controllers/medica-controller')
const router = Router()

//crear ficha médica => /api/medic
router.post('/', medicCtrl.createFichaMedica)

module.exports = router