const router = require('express').Router();



// route /auth
router.use('/auth',require('./auth'))
// route  /Category
router.use('/category', require('./category')) 
// route "/" home page
router.use('/', require('./post'))

module.exports = router