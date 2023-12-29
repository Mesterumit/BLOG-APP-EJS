module.exports=(err,req,res,next)=>{
    res.render('pages/error', {error:true, message:err.message, stack: err.stack})
   
}