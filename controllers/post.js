const Category = require('../models/Category')
const Post = require('../models/Post')
const User = require('../models/User');

exports.getPosts = async(req,res)=>{
    let categories = await Category.find()
    // let posts = await Post.find({ userId: req.session.user }).populate(['userId','categoryId'])
    const recentPosts = await Post.find().sort({createdAt:'desc'}).limit(3)
    res.render('pages/Home', {categories,posts:res.results,recentPosts, docTitle:'Home page'})
}

exports.getAddForm = async(req,res)=>{
    let categories = await Category.find()
    res.render('pages/addForm',{docTitle:'Create Post',categories})
}

exports.postPost = async(req,res)=>{
    // console.log("post craeting...")
    // console.log("user : ",req.session?.user._id)
    // i need to get the userId , because i haven't added in addForm
    // from the session ,because we have stored the user in session
    // when he logged in , after that i need to add "id" to body
    //  getting userId = req.session?user._id
    req.body.userId = req.session?.user._id
    
    // to check teh published or not
    req.body.publish = req.body?.publish === 'on'? true : false;
  
    // image
    // adding the image to "req.body.image"
    console.log(req.file)
    if(req.file){
        // so we have an image, that we have created in post Model 
        // it is default as "/images/no-photo.png"
        // if i don't add the filename to image
        // in db , the name of the image will be "/images/no-photo.png"
        // but i can get the name of the image from "multer" middleware i have created to upload the image
        req.body.image = '/images/'+ req.file.filename
    }
    await Post.create(req.body)
    req.flash("success", "Post Added Successfully !");
    res.redirect('/')
}

exports.deletePost=async(req,res)=>{
    await Post.findByIdAndDelete(req.params.id)
    req.flash("success",'Post Deleted')
    res.redirect('/')
}

exports.getDetails = async(req,res)=>{
    const post = await Post.findOne({_id: req.params.id})
    const categoryId= await Category.findOne({_id: post.categoryId})
    const userId= await User.findOne({_id: post.userId})
    
    
    res.render('pages/details',{ docTitle:post.title,userId, categoryId,post})
}



