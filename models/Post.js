const {Schema, model} = require('mongoose')

const postSchema = Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        ref:'Category'
    },
    title:{
        type:String,
        trim:true,
        required:true,
        uniqe:[true,'Post title is required'],
        minlength:3
    },
    content:{
        type:String,
        required:true,
        trim:true,
        uniqe:[true,'Post content is required'],
        maxlength:500
    },
    publish:{
       type:Boolean,
       default:true
    },
    image:{
        type:String,
        default:'/imgs/no-photo.jpg'

    }
},{timestamps:true})
module.exports = model('Post', postSchema)