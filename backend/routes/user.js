const express = require('express')

const { loginUser, signupUser } = require("../controllers/userController")

const router = express.Router()

// log in route

router.post('/login', loginUser )


// register route

router.post('/signup', signupUser)

module.exports = router