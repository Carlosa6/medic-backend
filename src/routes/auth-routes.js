const {Router} = require('express')
const authCtrl = require('../controllers/auth-controller')
const {body} = require('express-validator')
const router = Router()

router.post('/signin',[
    body('email').not().isEmpty().isEmail().normalizeEmail(),
    body('password').not().isEmpty().isLength({min:6})
],authCtrl.authSignin)

module.exports = router