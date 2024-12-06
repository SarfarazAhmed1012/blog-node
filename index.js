const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/user.route')
const blogRoute = require('./routes/blog.route.js')
const commentRoute = require('./routes/comment.route.js')
const cookieParser = require("cookie-parser")
const { checkForAuthenticationCookie } = require('./middlewares/authentication')
const Blog = require('./models/blog.model.js')
const app = express()
const PORT = process.env.PORT || 8000

mongoose.connect("mongodb+srv://sarfarazahmed101:some_pass@cluster0.yfxu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then((connection) => {
        console.log("Database is connected")
    }).catch((err) => {
        console.log("Error while connecting database", err)
    })

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

app.get("/", async (req, res) => {

    if (!req?.user?._id) {
        return res.redirect("/user/signin")
    }
    const allBlogs = await Blog.find({ createdBy: req.user._id }).sort({ createdAt: -1 })
    res.render("home", {
        user: req.user,
        allBlogs
    })
})

app.use("/user", userRoute)
app.use("/blog", blogRoute)
app.use("/comment", commentRoute)

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))