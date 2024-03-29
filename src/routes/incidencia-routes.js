const { Router } = require('express')
const incidencaiCtrl = require('../controllers/incidencia-controller')
const auth = require('../helpers/autenticacion')

const router = Router()

router.post('/', [
    auth.verificarToken, auth.isAdmin
], incidencaiCtrl.createIncidencia)

router.get('/:id', [
    auth.verificarToken, auth.isAdmin
], incidencaiCtrl.mostrarIncidenciaxId)

router.get('/user/:codigo',[
    auth.verificarToken,auth.isAdmin
],incidencaiCtrl.incidenciasxUsuario)

module.exports = router