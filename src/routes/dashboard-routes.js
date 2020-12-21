const router = require('express').Router()
const chartsCtrl = require('../controllers/dashboard-controller')

// api/charts/tipo-de-sangre
router.get('/tipo-de-sangre', chartsCtrl.chartTipoSangre)

//api/charts/seguro-medico
router.get('/seguro-medico', chartsCtrl.seguroMedico)

module.exports = router