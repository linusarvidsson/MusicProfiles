const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

const Post = mongoose.model('post', postSchema)

module.exports = Post
