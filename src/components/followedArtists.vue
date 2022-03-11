<template>
  <div class="block">
    <h1>My top artists</h1>
    <!--  <ul v-for="artist in followedArtists" :key="artist.id">
      <li>
        <div class="hoverBox" @click="goToWebsite(artist.uri)">
          <img :src="artist.images[0].url" class="albumImage" />
          <p class="plName">{{ artist.name }}</p>
        </div>
      </li>
    </ul> -->
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
      followedArtists: ''
    }
  },
  mixins: [spotifyApi],
  async mounted() {
    this.followedArtists = await this.getFollowedArtists()
  }
}
</script>

<style lang="scss" scoped>
.block {
  background-color: black;
  width: auto;
  height: auto;
  max-width: 355px;
  max-height: 355px;
  margin-bottom: 8%;
}
ul {
  float: left;
  list-style-type: none;
  padding: 1px;
  margin: 0px;
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
  margin-top: -40px;
}

.albumImage {
  width: 175px;
  height: 175px;
}
</style>
