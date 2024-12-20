const { Schema, model } = require('mongoose')

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comment"
    }]
}, { timestamps: true })

const Blog = model('blog', blogSchema)

module.exports = Blog