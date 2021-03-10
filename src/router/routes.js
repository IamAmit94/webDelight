const express = require('express')
const Router = express.Router()
const authorized = require('../middleware/midle')
const accountController = require('../controller/accountUser')


Router.post('/User_Signup', accountController.userSignup)

Router.post('/User_Login', accountController.login)

Router.put('/Update_Profile', authorized.verifyToken,accountController.updateProfile)

module.exports = Router