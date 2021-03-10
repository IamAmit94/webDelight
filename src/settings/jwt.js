
const jwt = require('jsonwebtoken')

const {JWT_SECRET, JWT_EXP} = process.env


// creating the token
const createToken  = async (data) => {

    try {
        let payData = {

            _id : data.id,
            email : data.email,
            userName: data.userName
        }

        const token = await jwt.sign({ data: payData}, JWT_SECRET, {expiresIn: JWT_EXP})
        return token

    } catch (error) {
        return error
    }
}


//decode the jwt token
const decodeToken = async (token) => {

try {
    var decode = jwt.verify(token, JWT_SECRET)
    return decode

} catch (error) {

    console.log(" Error ---", error)
    return error
}
}

module.exports = {
    createToken,
    decodeToken
}