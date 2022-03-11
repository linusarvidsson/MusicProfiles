const bcrypt = require('bcrypt')
const User = require('../models/user')

// Add user
exports.addUser = async function(req, res) {
  let username = req.body.username.replace(/\s+/g, '')

  User.findOne({ username: username }, async function(err, userFound) {
    if (err) {
      console.log(err)
    } else {
      if (userFound) {
        res.json({ success: false, message: 'User already exists' })
      } else {
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        let user = new User()
        user.username = username
        user.password = hashedPassword
        user.email = req.body.email.toLowerCase()
        user.firstname = toTitleCase(req.body.firstname)
          .replace(/\s+/g, ' ')
          .trim()
        user.lastname = toTitleCase(req.body.lastname)
          .replace(/\s+/g, ' ')
          .trim()
        user.save()
        res.json({
          success: true,
          message: 'User ' + user.username + ' registered'
        })
      }
    }
  })
}

// Get user
exports.getUser = async function(req, res) {
  let username = req.userInfo.username
  if (req.query.user) username = req.query.user

  User.findOne({ username: username }, async function(err, user) {
    if (err) console.log(err)
    else {
      res.json({
        success: true,
        message: 'User ' + user.username + ' returned',
        user: user
      })
    }
  })
}

exports.addFriend = async function(req, res) {
  User.findOne({ username: req.userInfo.username }, async function(err, user) {
    if (err) {
      console.log(err)
    } else {
      user.friends.push(req.body.user)
      user.save()
      res.json({
        success: true,
        message: req.body.user + ' added to friends'
      })
    }
  })
}

exports.searchUsers = async function(req, res) {
  if (req.query.query !== '') {
    let offset = 0
    let limit = 10
    if (req.query.offset) offset = parseInt(req.query.offset, 10)
    if (req.query.limit) limit = parseInt(req.query.limit, 10)

    User.aggregate([
      {
        $project: {
          name: { $concat: ['$firstname', ' ', '$lastname'] },
          username: '$username'
        }
      },
      { $skip: offset },
      { $limit: limit },
      {
        $match: {
          $or: [
            { name: { $regex: req.query.query, $options: 'i' } },
            { username: { $regex: req.query.query, $options: 'i' } }
          ]
        }
      }
    ]).exec(function(err, result) {
      if (err) console.log(err)
      if (result.length > 0) {
        res.json({ result: result, message: '' })
      } else {
        res.json({ result: result, message: 'No users found' })
      }
    })
  }
}

function toTitleCase(str) {
  return str.replace(/(^|[\s-])\S/g, function(match) {
    return match.toUpperCase()
  })
}
