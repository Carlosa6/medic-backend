const router = require('express').Router()
const chartsCtrl = require('../controllers/dashboard-controller')

// api/charts
//router.get('/', chartsCtrl.charts)
router.get('/', chartsCtrl.charts1)

module.exports = router