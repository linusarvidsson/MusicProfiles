require('dotenv').config()
const SpotifyWebApi = require('spotify-web-api-node')
const SpotifyUser = require('../models/spotifyUser')

//const redirectUri = 'http://localhost:8080/'
//const clientId = process.env.CLIENT_ID

var credentials = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'http://localhost:8080/spotify/'
}

// Spotify API for client credential flow as spotify authoirization
var spotifyApi = new SpotifyWebApi(credentials)
// Variable that stores the time for when the client access token to spotify expires
var tokenExpiryDate

// Initial credential grant to get an spotify access token
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token'])
    tokenExpiryDate = data.body['expires_in']
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err)
  }
)

// Scopes of the spotify API that the client will be granted
const scopes = [
  'user-read-playback-state',
  'user-read-email',
  'playlist-read-collaborative',
  'user-modify-playback-state',
  'user-top-read',
  'user-read-currently-playing',
  'user-read-recently-played',
  'playlist-modify-private',
  'user-follow-modify',
  'user-library-read'
]

// Check if client access token has expired and refresh if needed
function checkClientAccessToken() {
  let now = new Date()
  if (tokenExpiryDate < now) {
    spotifyApi.clientCredentialsGrant().then(
      function(data) {
        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token'])
        tokenExpiryDate = data.body['expires_in']
      },
      function(err) {
        console.log('Something went wrong when retrieving an access token', err)
      }
    )
  }
}

// Get the user document that contains the spotify tokens
async function getUser(username) {
  return SpotifyUser.findOne({ username: username }, function(error) {
    if (error) console.log(error)
  })
}

// Store all spotify tokens of a spotify user in the database
async function setUserTokens(username, expiresIn, accessToken, refreshToken) {
  SpotifyUser.findOne({ username: username }, async function(error, user) {
    if (error) console.log(error)
    else {
      if (user) {
        let now = new Date()
        let expiryDate = new Date(now.getTime() + expiresIn * 1000)
        user.expiryDate = expiryDate
        user.accessToken = accessToken
        user.refreshToken = refreshToken
        user.save()
      } else {
        let spotifyUser = new SpotifyUser()
        spotifyUser.username = username
        let now = new Date()
        spotifyUser.expiryDate = new Date(now.getTime() + expiresIn * 1000)
        spotifyUser.accessToken = accessToken
        spotifyUser.refreshToken = refreshToken
        spotifyUser.save()
      }
    }
  })
}

// Update the access token of a spotify user in the database
async function updateAccessToken(username, expiresIn, accessToken) {
  SpotifyUser.findOne({ username: username }, async function(error, user) {
    if (error) console.log(error)
    else {
      if (user) {
        let now = new Date()
        user.expiryDate = new Date(now.getTime() + expiresIn * 1000)
        user.accessToken = accessToken
        user.save()
      } else {
        let spotifyUser = new SpotifyUser()
        spotifyUser.username = username
        let now = new Date()
        user.expiryDate = new Date(now.getTime() + expiresIn * 1000)
        spotifyUser.accessToken = accessToken
        spotifyUser.save()
      }
    }
  })
}

// Check if an access token has expired
function isExpired(expiryDate) {
  let now = new Date()
  if (expiryDate < now) return true
  else return false
}

// Get a spotify api that is authorized to access a spotify user
async function getSpotifyApi(username) {
  let userSpotifyApi = new SpotifyWebApi(credentials)
  let user = await getUser(username)

  userSpotifyApi.setAccessToken(user.accessToken)
  userSpotifyApi.setRefreshToken(user.refreshToken)

  if (isExpired(user.expiryDate)) {
    await userSpotifyApi.refreshAccessToken().then(function(data) {
      spotifyApi.setAccessToken(data.body['access_token'])
      updateAccessToken(
        username,
        data.body['expires_in'],
        data.body['access_token']
      )
    })
  }

  return userSpotifyApi
}

//-------------------- Authorization --------------------//

// Get the authorization URL for the authorization code flow
exports.getAuthorizationUrl = function(req, res) {
  var authorizationUrl = spotifyApi.createAuthorizeURL(scopes)

  res.json({ authorizationUrl })
}

// Get the access token and refresh token for a user with a code (authorization code flow)
exports.getTokens = async function(req, res) {
  console.log(req.body.code)
  if (req.body.code) {
    spotifyApi.authorizationCodeGrant(req.body.code).then(
      function(data) {
        setUserTokens(
          req.userInfo.username,
          data.body['expires_in'],
          data.body['access_token'],
          data.body['refresh_token']
        )

        res.json({
          sucess: true,
          message: 'Tokens stored'
        })
      },
      function(err) {
        console.log(err)
      }
    )
  }
}

//--------------------- Search ---------------------//

exports.searchTracks = async function(req, res) {
  checkClientAccessToken()
  spotifyApi.searchTracks(req.body.query, req.body.options).then(
    function(data) {
      res.json(data.body.tracks.items)
    },
    function(err) {
      console.error(err)
    }
  )
}

exports.searchArtists = async function(req, res) {
  checkClientAccessToken()
  spotifyApi.searchArtists(req.body.query, req.body.options).then(
    function(data) {
      res.json(data.body.artists.items)
    },
    function(err) {
      console.error(err)
    }
  )
}

exports.searchAlbums = async function(req, res) {
  checkClientAccessToken()
  spotifyApi.searchAlbums(req.body.query, req.body.options).then(
    function(data) {
      res.json(data.body.albums.items)
    },
    function(err) {
      console.error(err)
    }
  )
}

exports.searchPlaylists = async function(req, res) {
  checkClientAccessToken()
  spotifyApi.searchPlaylists(req.body.query, req.body.options).then(
    function(data) {
      res.json(data.body.playlists.items)
    },
    function(err) {
      console.error(err)
    }
  )
}

//--------------------- Get ---------------------//

// Get list of albums from array of album IDs
exports.getAlbums = async function(req, res) {
  checkClientAccessToken()
  spotifyApi.getAlbums(req.body.albums).then(
    function(data) {
      res.json(data.body)
    },
    function(err) {
      console.error(err)
    }
  )
}

//--------------------- User ---------------------//

exports.getUserPlaylists = async function(req, res) {
  let username = req.userInfo.username
  if (req.query.username) {
    username = req.query.username
  }
  let userSpotifyApi = await getSpotifyApi(username)

  let spotifyUser = await userSpotifyApi.getMe()
  let spotifyUsername = spotifyUser.body.id
  userSpotifyApi.getUserPlaylists(spotifyUsername).then(
    function(data) {
      res.json(data.body)
    },
    function(err) {
      res.json({ success: false, error: err })
    }
  )
}

exports.getMySavedAlbums = async function(req, res) {
  let username = req.userInfo.username
  if (req.query.username) {
    username = req.query.username
  }
  let userSpotifyApi = await getSpotifyApi(username)

  userSpotifyApi.getMySavedAlbums({ limit: 8, offset: 0 }).then(
    function(data) {
      res.json(data.body)
    },
    function(err) {
      res.json({ success: false, error: err })
    }
  )
}

exports.getMyTopArtists = async function(req, res) {
  let username = req.userInfo.username
  if (req.query.username) {
    username = req.query.username
  }
  let userSpotifyApi = await getSpotifyApi(username)
  let time_range = req.query.time_range
  userSpotifyApi
    .getMyTopArtists({ limit: 4, offset: 0, time_range: time_range })
    .then(
      function(data) {
        res.json(data.body)
      },
      function(err) {
        res.json({ success: false, error: err })
      }
    )
}

exports.getMyTopTracks = async function(req, res) {
  let username = req.userInfo.username
  if (req.query.username) {
    username = req.query.username
  }
  let userSpotifyApi = await getSpotifyApi(username)
  let time_range = req.query.time_range
  userSpotifyApi
    .getMyTopTracks({ limit: 6, offset: 0, time_range: time_range })
    .then(
      function(data) {
        res.json(data.body)
      },
      function(err) {
        res.json({ success: false, error: err })
      }
    )
}

exports.getMyCurrentPlaybackState = async function(req, res) {
  let username = req.userInfo.username
  if (req.query.username) {
    username = req.query.username
  }
  let userSpotifyApi = await getSpotifyApi(username)

  userSpotifyApi.getMyCurrentPlaybackState().then(
    function(data) {
      res.json(data.body)
    },
    function(err) {
      res.json({ success: false, error: err })
    }
  )
}

exports.getMyRecentlyPlayedTracks = async function(req, res) {
  let username = req.userInfo.username
  if (req.query.username) {
    username = req.query.username
  }
  let userSpotifyApi = await getSpotifyApi(username)

  userSpotifyApi.getMyRecentlyPlayedTracks({ limit: 6, offset: 0 }).then(
    function(data) {
      res.json(data.body)
    },
    function(err) {
      res.json({ success: false, error: err })
    }
  )
}

exports.getFollowedArtists = async function(req, res) {
  let userSpotifyApi = await getSpotifyApi(req.userInfo.username)
  userSpotifyApi.getFollowedArtists({ limit: 4 }).then(
    function(data) {
      res.json(data.body)
    },
    function(err) {
      res.json({ success: false, error: err })
    }
  )
}

// Get user info of logged in user
exports.getMe = async function(req, res) {
  let username = req.userInfo.username
  if (req.query.username) {
    username = req.query.username
  }
  let userSpotifyApi = await getSpotifyApi(username)

  userSpotifyApi.getMe().then(
    function(data) {
      res.json(data.body)
    },
    function(err) {
      res.json({ success: false, error: err })
    }
  )
}
