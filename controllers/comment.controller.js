const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");

exports.addComment = async (req, res) => {
    const blogId = req.params.blogId
    const { content } = req.body

    try {
        const comment = new Comment({ content, blogId, createdBy: req.user._id })
        const blog = await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment._id } })
        await comment.save()
        res.redirect(`/blog/${blogId}`)
    } catch (err) {
        console.log(err)
        res.redirect(`/blog/${blogId}`)
    }
}