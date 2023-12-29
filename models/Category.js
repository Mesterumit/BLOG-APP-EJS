const {Schema, model} = require('mongoose')

const categorySchema = Schema({
    name:{
        type:String,
        trim:true,
        require:[true, 'Category name is required']
    }

},{timestamps:true})

module.exports= model('Category', categorySchema)