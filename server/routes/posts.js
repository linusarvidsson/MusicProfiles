const express = require('express')
const router = express.Router()

const postController = require('../controllers/postController')

// Get posts
router.get('/', postController.getPosts)

// Add post
router.post('/', postController.addPost)

// Delete post
router.delete('/', postController.deletePost)

module.exports = router
