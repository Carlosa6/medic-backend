const router = require('express').Router()
const chartsCtrl = require('../controllers/dashboard-controller')

// api/charts
router.get('/', chartsCtrl.charts)
router.get('/cir_sangre', chartsCtrl.charts1)
router.get('/cir_seguro', chartsCtrl.charts2)

module.exports = router