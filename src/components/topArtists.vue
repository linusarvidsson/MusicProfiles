<template>
  <div class="block">
    <h1>Top artists</h1>
    <ul v-for="artist in topArtist" :key="artist.id">
      <li>
        <div class="hoverBox" @click="goToWebsite(artist.uri)">
          <img :src="artist.images[0].url" class="albumImage" />
          <p class="plName">{{ artist.name }}</p>
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
      id: this.$route.params.id,
      topArtist: '',
      time_range: 'medium_term'
    }
  },
  mixins: [spotifyApi],
  async mounted() {
    this.topArtist = (
      await this.getMyTopArtists(this.id, this.time_range)
    ).items
  }
}
</script>

<style lang="scss" scoped>
.block {
  width: auto;
  height: auto;
  max-width: 355px;

  position: relative;
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
