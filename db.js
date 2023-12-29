const {connect} = require('mongoose')

module.exports = async function(){
    try{
        const db =await connect(process.env.MONGO)
        console.log(`Data base is connected ${db.connection.host}`.yellow.underline)
    }catch(err){
        console.log(`Couldn't connect the DB, ${err.message}`)

    }
   
}