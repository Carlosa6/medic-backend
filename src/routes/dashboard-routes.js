const router = require('express').Router()
const chartsCtrl = require('../controllers/dashboard-controller')

router.get('/tipo-de-sangre', chartsCtrl.chartTipoSangre)

module.exports = router