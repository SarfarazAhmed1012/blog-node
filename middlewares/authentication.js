const { validateToken } = require("../services/authentication")

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const cookie = req.cookies[cookieName]

        if (!cookie) {
            return next()
        }

        try {
            const userPayload = validateToken(cookie)
            req.user = userPayload
        } catch (err) {
            console.log(err)
        }

        next()
    }
}

module.exports = {
    checkForAuthenticationCookie
}