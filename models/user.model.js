const { Schema, model } = require('mongoose')
const { createHmac, randomBytes } = require('crypto');
const { createTokenUser } = require('../services/authentication');
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: false
    },
    profileImage: {
        type: String,
        default: '/images/avatar.png'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, {
    timestamps: true
})

userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return

    console.log({ randomBytes })

    const salt = randomBytes(16).toString('hex')
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex')

    this.salt = salt
    this.password = hashedPassword

    next()
})

userSchema.static('matchPasswordAndGenerateToken', async function (email, password) {
    console.log("ran?")
    const user = await this.findOne({ email })

    console.log({ user })

    if (!user) throw new Error("User not found")

    const salt = user.salt;
    const hashedPassword = user.password

    console.log({ salt, hashedPassword })

    const userProvidedHash = createHmac("sha256", salt).update(password).digest("hex")

    if (hashedPassword === userProvidedHash) {
        const token = createTokenUser(user)
        return token
    } else {
        throw new Error("Incorrect Password")
    }
})

const User = model('user', userSchema)
module.exports = User

