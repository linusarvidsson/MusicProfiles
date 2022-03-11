<template>
  <div class="block">
    <h1>Top 6 tracks</h1>
    <ul v-for="track in topTracks" :key="track.id">
      <li>
        <img
          class="spotifyPLayLogo"
          src="https://dl1.cbsistatic.com/i/2017/04/12/f3a60331-48ce-4b98-8cce-3b23f2a76558/2ec57e2e209f330a0d0ca96dd6db42de/imgingest-853540607404562886.png"
          @click="goToWebsite(track.uri)"
        />
        <p class="plName">{{ track.artists[0].name }} - {{ track.name }}</p>
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
      topTracks: '',
      time_range: 'medium_term'
    }
  },
  mixins: [spotifyApi],
  async mounted() {
    this.topTracks = (await this.getMyTopTracks(this.id, this.time_range)).items
  }
}
</script>

<style lang="scss" scoped>
.block {
  width: auto;
  height: auto;
  max-width: 380px;
  max-height: 440px;
  margin-left: 4%;
  text-align: center;
  position: relative;
}
.plName {
  font-weight: bold;
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
