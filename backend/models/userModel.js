const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema
/* Schema defines the structure of that model */
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method

userSchema.statics.signup = async function (email, password) {

    // validation using validator package

    if(!email || !password) {
        throw Error('All fields must be filled')
    }
    
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }
    
    const exists = await this.findOne({ email })

    if(exists) {
        throw Error('Email is already in use')
    }
        
    // encrypting password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })
    
    // because we call it in another function
    return user
}
// static login method
userSchema.statics.login = async function (email, password) {
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
   if(!user){
      throw Error('Incorrect Email')
   }
    
   const match = await bcrypt.compare(password, user.password)
   if(!match){
    throw Error('Incorrect Password')
   }
    
   return user




}
/* we use this in another file to interact with the model itself (or to our collection) to find, to post to update or any other in other files */
module.exports = mongoose.model('User', userSchema)