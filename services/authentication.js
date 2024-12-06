const JWT = require("jsonwebtoken")

const secret = "myjsonsecret"

function createTokenUser(user) {
    const payload = {
        _id: user._id,
        profileImage: user.profileImage,
        email: user.email,
        role: user.role
    };

    const token = JWT.sign(payload, secret, { expiresIn: "1d" })

    return token
}

function validateToken(token) {
    const payload = JWT.verify(token, secret)

    return payload
}

module.exports = {
    createTokenUser,
    validateToken
}