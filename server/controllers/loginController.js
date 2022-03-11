require('dotenv').config()
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.login = async function(req, res) {
  const user = await User.findOne({ username: req.body.username })
  if (!user) {
    res.json({
      success: false,
      message: 'No user exists with that username'
    })
  } else if (await bcrypt.compare(req.body.password, user.password)) {
    const userInfo = {
      username: user.username
    }
    const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h'
    })
    res.json({
      success: true,
      message: 'Log in successful',
      user: user,
      token: token
    })
  } else {
    res.json({ success: false, message: 'Wrong password' })
  }
}
