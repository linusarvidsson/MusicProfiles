const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')

// Log In
router.post('/', loginController.login)

module.exports = router
