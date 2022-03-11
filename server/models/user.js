const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  friends: Array
})

//userSchema.index({ username: 'text', firstname: 'text', lastname: 'text' })

const User = mongoose.model('user', userSchema)

module.exports = User
