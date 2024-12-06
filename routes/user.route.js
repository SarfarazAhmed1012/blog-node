const express = require('express')
const { signup, signin } = require('../controllers/user.controller')
const router = express.Router()


router.get("/signup", (req, res) => {
    res.render("signup")
})

router.get("/signin", (req, res) => {
    res.render("signin")
})

router.get("/logout", (req, res) => {
    res.clearCookie("token")

    res.redirect("/")
})

router.post("/signup", signup)

router.post("/signin", signin)

module.exports = router