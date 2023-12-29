const router = require('express').Router();
const ctrl = require('../controllers/post')
const upload = require('../middlewares/upload')
const query = require('../middlewares/query')
const Post = require('../models/Post')


router.get('/', query(Post,['userId','categoryId']),ctrl.getPosts)
router.get('/post', query(Post,['userId','categoryId']),ctrl.getPosts)
router.get('/post/create', ctrl.getAddForm)
router.post('/post/create',upload.single('image'), ctrl.postPost)
router.get('/post/delete/:id', ctrl.deletePost)
// router.get('/post/edit/:id', upload.single('image'), ctrl.postPost)
router.get('/post/:id', ctrl.getDetails)

module.exports = router