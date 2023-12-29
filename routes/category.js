const router = require('express').Router()
const Category = require('../controllers/Category')


router.get('/create',Category.getCatgory)

router.post('/create',Category.postCateory)

module.exports = router