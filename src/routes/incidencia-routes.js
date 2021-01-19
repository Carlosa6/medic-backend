const {Router} = require('express')
const incidencaiCtrl = require('../controllers/incidencia-controller')
const auth = require('../helpers/autenticacion')

const router = Router()

router.post('/',incidencaiCtrl.createIncidencia)

router.get('/:id',incidencaiCtrl.mostrarIncidenciaxId)

module.exports = router