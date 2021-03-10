const userModel = require('../model/userModel')
const {createAccount} = require('../validator/userValidate')
const {createToken} = require('../settings/jwt')
 

const Joi = require('joi')

//API for the user Signup
const userSignup = async (req, res) => {
    try {

    // validating the params before entering to the db
        const userForm = await createAccount.validateAsync(req.body)
        console.log(userForm)
// saving the data to the db
        const user = await new userModel(req.body).save()
        const token = await createToken(user)// creating the token 
//updated the token and data to db
        const updateUser = await userModel.findOneAndUpdate({
            _id: user._id}, {token: token}, { new: true})

            res.status(200).send({data: updateUser})

    } catch (error) {
     res.status(400).json({ message: error.message})   
    }
}
// API for the user Login

const login = async (req, res) => {
    try {
        //findByCredential is usermade funx present in userModel to check the email and password
        const userData = await userModel.findByCredentials(req.body.email, req.body.password)
        console.log('User Data', userData)

        const token = await createToken(userData)
// once the data get match update the token to db
        const updateUser = await userModel.findOneAndUpdate({_id: userData._id}, {token: token}, { new: true})

        res.status(200).send(updateUser)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}
// API to update the profile of user
const updateProfile = async (req, res) => {
    try {
        // requesting the id of user with the help of middleware
        const id = req.user._id
        const user = await userModel.findById(id)
// if user found then update the data
        if(user){
            const updateProfile = await userModel.findByIdAndUpdate(user, req.body, { new: true, runValidators: true}).select('-token -password')

            return res.status(200).send(updateProfile)
        }
        
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

module.exports = {

    userSignup,
    login,
    updateProfile
}