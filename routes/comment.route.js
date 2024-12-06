const express = require('express')
const { addComment } = require('../controllers/comment.controller')

const router = express.Router()

router.post("/:blogId/comment", addComment)

module.exports = router