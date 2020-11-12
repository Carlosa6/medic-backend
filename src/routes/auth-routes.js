const {Router} = require('express')
const authCtrl = require('../controllers/auth-controller')
const router = Router()

router.post('/signin',authCtrl.authSignin)

module.exports = router