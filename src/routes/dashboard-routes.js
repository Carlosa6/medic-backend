const router = require('express').Router()
const chartsCtrl = require('../controllers/dashboard-controller')

// api/charts
router.get('/', chartsCtrl.charts)

module.exports = router