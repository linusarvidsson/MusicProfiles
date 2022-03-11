<template>
  <div class="block">
    <h1>Playlists</h1>
    <ul v-for="playlist in userPlaylists.slice(0, 4)" :key="playlist.id">
      <li>
        <div class="hoverBox" @click="goToWebsite(playlist.uri)">
          <img :src="playlist.images[0].url" class="albumImage" />
          <p class="plName">{{ playlist.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import spotifyApi from '../mixins/spotifyApi.js'
export default {
  methods: {
    goToWebsite(url) {
      window.location.href = url
    }
  },
  data() {
    return {
      userPlaylists: '',
      id: this.$route.params.id
    }
  },
  mixins: [spotifyApi],
  async mounted() {
    this.userPlaylists = (await this.getUserPlaylists(this.id)).items
  }
}
</script>

<style lang="scss" scoped>
.block {
  margin-left: 5%;
  max-width: 355px;
  max-height: 355px;
  position: relative;
  margin-top: 2%;
}
ul {
  float: left;
  list-style-type: none;
  padding: 1px;
  margin: 0px;
  max-width: 175px;
}
img.albumImage:hover {
  filter: blur(5px);
}
.hoverBox:hover {
  color: rgb(255, 255, 255);
}

div.hoverBox {
  color: rgba(0, 0, 0, 0);
}
.plName {
  position: relative;
  top: -70px;
  margin-top: -44px;
}

.albumImage {
  width: 175px;
  height: 175px;
}
</style>
