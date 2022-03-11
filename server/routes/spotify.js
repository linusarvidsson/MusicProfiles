const express = require('express')
const router = express.Router()

const spotifyController = require('../controllers/spotifyController')

router.get('/getAuthorizationUrl', spotifyController.getAuthorizationUrl)
router.post('/getTokens', spotifyController.getTokens)
router.get('/getMe', spotifyController.getMe)
router.post('/getAlbums', spotifyController.getAlbums)
router.post('/searchTracks', spotifyController.searchTracks)
router.post('/searchArtists', spotifyController.searchArtists)
router.post('/searchAlbums', spotifyController.searchAlbums)
router.post('/searchPlaylists', spotifyController.searchPlaylists)
router.get('/getUserPlaylists', spotifyController.getUserPlaylists)
router.get('/getMySavedAlbums', spotifyController.getMySavedAlbums)
router.get('/getMyTopArtists', spotifyController.getMyTopArtists)
router.get('/getMyTopTracks', spotifyController.getMyTopTracks)
router.get(
  '/getMyCurrentPlaybackState',
  spotifyController.getMyCurrentPlaybackState
)
router.get(
  '/getMyRecentlyPlayedTracks',
  spotifyController.getMyRecentlyPlayedTracks
)
router.get('/getFollowedArtists', spotifyController.getFollowedArtists)
module.exports = router
