import axios from 'axios'

const spotifyApi = {
  methods: {
    async getAlbums(albums) {
      const response = await axios.post(
        'http://localhost:3000/spotify/getAlbums',
        { albums: albums },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      )
      return response.data.albums
    },
    async getAlbum(album) {
      let theAlbum = await this.getAlbums([album])
      return theAlbum[0]
    },
    async getUserPlaylists(id) {
      const response = await axios.get(
        'http://localhost:3000/spotify/getUserPlaylists',
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
          params: { username: id }
        }
      )

      return response.data
    },
    async getMySavedAlbums(id) {
      const response = await axios.get(
        'http://localhost:3000/spotify/getMySavedAlbums',
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
          params: { username: id }
        }
      )

      return response.data
    },
    async getMyTopArtists(id, range) {
      const response = await axios.get(
        'http://localhost:3000/spotify/getMyTopArtists',
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
          params: { username: id, time_range: range }
        }
      )

      return response.data
    },
    async getMyTopTracks(id, range) {
      const response = await axios.get(
        'http://localhost:3000/spotify/getMyTopTracks',
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
          params: { username: id, time_range: range }
        }
      )

      return response.data
    },
    async getMe(id) {
      const response = await axios.get('http://localhost:3000/spotify/getMe', {
        headers: { Authorization: `Bearer ${localStorage.token}` },
        params: { username: id }
      })

      return response.data
    },
    async getMyCurrentPlaybackState(id) {
      const response = await axios.get(
        'http://localhost:3000/spotify/getMyCurrentPlaybackState',
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
          params: { username: id }
        }
      )
      return response.data
    },
    async getFollowedArtists() {
      const response = await axios.get(
        'http://localhost:3000/spotify/getFollowedArtists',
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      )
      return response.data
    },
    async getMyRecentlyPlayedTracks(id) {
      const response = await axios.get(
        'http://localhost:3000/spotify/getMyRecentlyPlayedTracks',
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
          params: { username: id }
        }
      )
      return response.data
    },
    async searchTracks(query, options) {
      let response = await axios.post(
        'http://localhost:3000/spotify/searchTracks',
        {
          query: query,
          options: options
        },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      )
      return response.data
    },
    async searchAlbums(query, options) {
      let response = await axios.post(
        'http://localhost:3000/spotify/searchAlbums',
        {
          query: query,
          options: options
        },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      )
      return response.data
    },
    async searchArtists(query, options) {
      let response = await axios.post(
        'http://localhost:3000/spotify/searchArtists',
        {
          query: query,
          options: options
        },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      )
      return response.data
    },
    async searchPlaylists(query, options) {
      let response = await axios.post(
        'http://localhost:3000/spotify/searchPlaylists',
        {
          query: query,
          options: options
        },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      )
      return response.data
    }
  }
}

export default spotifyApi
