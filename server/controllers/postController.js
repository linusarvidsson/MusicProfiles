const Post = require('../models/post')

// Add post
exports.addPost = function(req, res) {
  let date = new Date()

  let post = new Post()
  post.date = date
  post.user = req.body.user
  post.name = req.body.name
  post.text = req.body.text

  post.save()
  res.json(post)
}

// Get posts
exports.getPosts = function(req, res) {
  Post.find({}, (error, articles) => {
    if (error) {
      console.log(error)
    } else {
      res.json(articles)
    }
  })
}

// Delete post
exports.deletePost = function(req, res) {
  Post.findByIdAndDelete(req.body.id, error => {
    if (error) {
      console.log(error)
    } else {
      res.send('Post deleted')
    }
  })
}
