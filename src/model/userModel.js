const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({

    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    token: {
        type: String
    },
    age: {
        type: String
    }
},{ timestamps: true
})


//controller(function ) for the login API
userSchema.statics.findByCredentials = async (email, password) => {
// find the user via email
    const user1 = await user.findOne({ email })
// if user not found on db
    if (!user1) {

        throw new Error('Unable to login on account ')
    }
// compare the paswrd enter via the user and stored pswd on db
    const isMatch = await bcrypt.compare(password, user1.password)

    if (!isMatch) {
        throw Error('Password is not correct ')
    }

    return user1
}

// pre middleware before saving the data to db

userSchema.pre('save', async function (next) {

    const user = this

    if (user.isModified('password')) {

        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const user = mongoose.model('user', userSchema)

module.exports = user
