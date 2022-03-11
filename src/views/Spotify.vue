<template>
  <div>
    This is a Spotify test page
    <div class="greenButton connect" @click="this.authorizeApp">
      Connect to Spotify
    </div>
    {{ this.message }}
    <br />
    Spotify browser:
    <br />
    <SpotifyBrowser @itemSelected="changeImage" />
    <br />
    Test loading an album cover
    <br />
    <img :src="this.albumImage" />
  </div>
</template>

<script>
import spotifyAuth from '../mixins/spotifyAuth.js'
import spotifyApi from '../mixins/spotifyApi.js'
import SpotifyBrowser from '@/components/SpotifyBrowser.vue'

export default {
  data() {
    return {
      albumImage: '',
      message: '',
      userPlaylists: ''
    }
  },
  mixins: [spotifyAuth, spotifyApi],
  components: { SpotifyBrowser },
  methods: {
    changeImage(item) {
      if (item.type == 'track') this.albumImage = item.album.images[1].url
      else if (item.images[1]) this.albumImage = item.images[1].url
    }
  },
  async mounted() {
    //innan sidan renderas
    if (this.$route.query.code) {
      var code = this.$route.query.code
      this.getSpotifyTokens(code)
    }

    this.albumImage = (
      await this.getAlbum('6LaLU27ZPXimJIbpbiOahr')
    ).images[1].url

    this.userPlaylists = (await this.getUserPlaylists()).items
  }
}
</script>

<style lang="scss" scoped>
.connect {
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 200px;
}
</style>
