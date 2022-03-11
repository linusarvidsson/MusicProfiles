<template>
  <div class="block">
    <h1>Recently saved albums</h1>
    <ul v-for="album in savedAlbums" :key="album.album.id">
      <li>
        <div class="hoverBox" @click="goToWebsite(album.album.uri)">
          <img :src="album.album.images[1].url" class="albumImage" />
          <p class="plName">{{ album.album.artists[0].name }}</p>
          <p class="plName" id="album">{{ album.album.name }}</p>
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
    return { id: this.$route.params.id, savedAlbums: '' }
  },
  mixins: [spotifyApi],
  async mounted() {
    this.savedAlbums = (await this.getMySavedAlbums(this.id)).items
  }
}
</script>

<style lang="scss" scoped>
.block {
  width: auto;
  height: auto;
  max-width: 710px;
  max-height: 355px;
  position: relative;
  margin-top: 2%;
}
ul {
  float: left;
  list-style-type: none;
  padding: 1px;
  margin: 0px;
  max-width: 176px;
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
  top: -80px;
  margin-top: -41px;
}

#album {
  top: -40px;
}

.albumImage {
  width: 175px;
  height: 175px;
}
</style>
