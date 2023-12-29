const router = require('express').Router();
const authCtrl = require('../controllers/auth')


router.get('/login' , authCtrl.getLogin)
router.post('/login', authCtrl.postLogin)

router.get('/register', authCtrl.getRegister)
router.post('/register', authCtrl.postRegister)
// console.log("post resgieter",authCtrl.postRegister)


router.get('/logout', authCtrl.getLogout)

module.exports = router