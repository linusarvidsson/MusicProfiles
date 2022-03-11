import axios from 'axios'

const spotifyAuth = {
  methods: {
    async authorizeApp() {
      const response = await axios.get(
        'http://localhost:3000/spotify/getAuthorizationUrl',
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      )
      window.location.href = response.data.authorizationUrl
    },

    async getSpotifyTokens(code) {
      var body = { code: code }

      axios.post('http://localhost:3000/spotify/getTokens', body, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
    }
  }
}

export default spotifyAuth
