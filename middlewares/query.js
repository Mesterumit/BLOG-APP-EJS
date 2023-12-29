const query = (Model,populate)=> async(req,res,next)=>{
    //search
    let search = req.query?.search || {}
    for(let key in search ) search[key]= {$regex:search[key], $options:'i'}

    //filter
    const filter = req.query?.filter || {}
    search ={...search, ...filter}
    //sort
    const sort = req.query.sort || {createdAt:'desc'}

   const results= await Model.find(search).sort(sort).populate(populate)
   // now i have "res.results"
   // i have attached it to "res"
   res.results = results

   next()
}
module.exports = query