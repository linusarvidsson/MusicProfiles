<template>
  <div class="block">
    <h1>Recently Played</h1>
    <ul v-for="track in recentlyPLayedTracks" :key="track.id">
      <li>
        <p class="plName">
          <img
            class="spotifyPLayLogo"
            src="https://dl1.cbsistatic.com/i/2017/04/12/f3a60331-48ce-4b98-8cce-3b23f2a76558/2ec57e2e209f330a0d0ca96dd6db42de/imgingest-853540607404562886.png"
            @click="goToWebsite(track.track.uri)"
          />
          {{ track.track.artists[0].name }} - {{ track.track.name }}
        </p>
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
    return { id: this.$route.params.id, recentlyPLayedTracks: '' }
  },
  mixins: [spotifyApi],
  async mounted() {
    this.recentlyPLayedTracks = (
      await this.getMyRecentlyPlayedTracks(this.id)
    ).items
  }
}
</script>

<style lang="scss" scoped>
.block {
  width: auto;
  height: auto;
  margin-left: 5%;
  max-width: 300px;
  max-height: 430px;
  text-align: center;
  margin-bottom: 0px;
  position: relative;
}

.hoverBox {
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 1px;
  margin: 0px;
}
.spotifyPLayLogo {
  width: 6%;
  float: right;
  margin-top: 1%;
  margin-left: 3%;
  height: auto;
}
.spotifyPLayLogo:hover {
  animation: move 0.5s;
  animation-iteration-count: infinite;
}

.plName {
  font-weight: bold;
}
@keyframes move {
  0% {
    transform: translate(0px, 0px);
  }
  25% {
    transform: translate(0px, -1px);
  }
  50% {
    transform: translate(0px, -2px);
  }
  75% {
    transform: translate(0px, -1px);
  }
  100% {
    transform: translate(0px, -0px);
  }
}
</style>
