const Category = require('../models/Category')


exports.getCatgory = async(req,res)=>{
    res.render('pages/category', {docTitle: 'Create Category'})


}


exports.postCateory = async(req,res)=>{

    const {name} = req.body

    if(!name){
        req.flash('error', 'Category is required')
        return res.redirect('/category/create');
    }
    const cat = await Category.findOne({name})

    if(cat){
        req.flash('error', 'Category is alreday exist')
        return res.redirect('category/create')
    }

    await Category.create(req.body)
    req.flash('success', 'Category created succesfully')
    res.redirect('/')
}