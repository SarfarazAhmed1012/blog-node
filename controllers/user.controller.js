const User = require("../models/user.model")

exports.signup = async (req, res) => {
    console.log(req.body)
    const { fullName, email, password } = req.body

    if (!fullName || !email || !password) {
        return res.json({
            error: "All fields are required"
        })
    }

    const user = new User({
        fullName,
        email,
        password
    })

    try {
        await user.save()
        return res.redirect("/")
    } catch (err) {
        console.log(err)
        return res.redirect("signin")
    }

}

exports.signin = async (req, res) => {

    try {

        const { email, password } = req.body

        console.log({ email, password })

        if (!email || !password) {
            res.status(400).json({
                status: false,
                error: "All fields are required"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            res.status(400).json({
                status: false,
                error: "User not found"
            })
        }

        const token = await User.matchPasswordAndGenerateToken(email, password)
        console.log({ token }, "token")

        return res.cookie("token", token).redirect("/")
    } catch (err) {
        console.log("errorin", err)
        return res.render("signin", {
            error: "Incorrect email or password"
        })
    }
}