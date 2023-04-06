const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

// we use id because it is part of the payload
const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
    
}

// login
 const loginUser = async (req, res) => {
        
    const {email, password} = req.body
    
    try {
        const user = await User.login(email, password)
         // let's create a token
         const token = createToken(user._id)
         // the token consists of the header, the payload and the secret
         
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    // just to check the loginUser is working or not
    // res.json({mssg: 'login user'})
 }
 
 // sign up user
 const signupUser = async (req, res) => {
    
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)
         // let's create a token
         const token = createToken(user._id)
         // the token consists of the header, the payload and the secret
         
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
      
    // just to check the signupUser is working or not
    // res.json({mssg: 'Signup user'})
 }

module.exports = { loginUser, signupUser  }
