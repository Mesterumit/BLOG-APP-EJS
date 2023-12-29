const {Schema, model} = require('mongoose')
const{genSalt, compare, hash} = require('bcrypt')
const userSchema = Schema({
    email:{
        type:String,
        trim:true,
        unique:true,
        required:[true, 'Email field is required'],
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Email need to macth to requirements']

    },
    password:{
        type:String,
        trim:true,
        unique:true,
        required:[true, 'Password field is required'],
    
    }

},{timestamps:true})

userSchema.pre('save', async function(next){

    const salt = await genSalt(12)
    this.password = await hash(this.password, salt)

    next()
} )
userSchema.methods.matchPassword=async function(enteredPassword){
    return compare(enteredPassword, this.password)
}


module.exports = model('User', userSchema)