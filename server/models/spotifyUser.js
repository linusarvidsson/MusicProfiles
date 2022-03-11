const mongoose = require('mongoose')
const Schema = mongoose.Schema

const spotifyUserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  expiryDate: Date,
  accessToken: String,
  refreshToken: String
})

const SpotifyUser = mongoose.model('spotifyUser', spotifyUserSchema)

module.exports = SpotifyUser
