const Blog = require("../models/blog.model");

const addBlog = async (req, res) => {
    console.log(req.body, req.file)

    const { title, body } = req.body
    const coverImage = req.file.filename

    const blog = new Blog({ title, body, coverImage: `/uploads/${coverImage}`, createdBy: req.user._id })

    try {
        await blog.save()
        res.redirect(`/blog/${blog._id}`)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    addBlog
}