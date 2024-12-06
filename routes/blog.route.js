const express = require('express')
const { addBlog } = require('../controllers/blog.controller')
const { upload } = require('../middlewares/multerConfig')
const Blog = require('../models/blog.model')

const router = express.Router()

router.get("/add-blog", (req, res) => {
    res.render("addBlog", {
        user: req.user
    })
})

router.get("/:blogId", async (req, res) => {
    const blog = await Blog.findById(req.params.blogId).populate({ path: "comments", populate: { path: "createdBy" } })
    res.render("blog", {
        user: req.user,
        blog
    })
})

router.post("/", upload.single("coverImage"), addBlog)

module.exports = router