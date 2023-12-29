const multer = require('multer')
const path = require('path')
module.exports = multer({storage:multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.resolve(__dirname,'../public/imgs'))
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})})