const userModel = require('../model/userModel')
const jwtToken = require('../settings/jwt')


let verifyToken = async ( req, res, next) => {

    try {
        // requsting token on headers
        const token = req.headers['authorization']
// if token is not present 
        if(!token)
        {
            throw Error('Token not found !')
        }
// match the token from the db
        let userData = await userModel.findOne({ token: token})
        if(!userData){
            throw Error('Not Authorized ')
        }
// decode the token 
        let userToken = await jwtToken.decodeToken(token)
        console.log('UserToken ', userToken)

        req.user = userData
        next()


    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {verifyToken}