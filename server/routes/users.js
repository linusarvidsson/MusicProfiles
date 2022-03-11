const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

// Get user
router.get('/', userController.getUser)

// Search users
router.get('/search', userController.searchUsers)

// Add user
router.post('/register', userController.addUser)

// Add friend
router.post('/addFriend', userController.addFriend)

module.exports = router
