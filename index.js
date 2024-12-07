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


// sockets section start from here
// const http = require("http");
// const express = require("express");
// const path = require("path");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server)

// app.use(express.static(path.resolve("./public")))

// app.get("/", (req, res) => {
//     return res.sendFile("./public/index.html")
// })

// // Handle WebSocket connections
// io.on("connection", (socket) => {
//     console.log("A user connected");

//     // Listen for messages from clients
//     socket.on("message", (data) => {
//         console.log("Message received:", data, socket.id);
//         // Broadcast message to all clients, including the sender
//         io.emit("server-message", { message: data, sender: socket.id });
//     });

//     // Handle typing event
//     socket.on("typing", (data) => {
//         socket.broadcast.emit("typing", data); // Notify other clients
//     });

//     // Handle stop typing event
//     socket.on("stop-typing", (data) => {
//         socket.broadcast.emit("stop-typing", data); // Notify other clients
//     });

//     // Handle disconnections
//     socket.on("disconnect", () => {
//         console.log("A user disconnected");
//     });
// });
// server.listen(8000, () => console.log(`Server is running at 8000`))