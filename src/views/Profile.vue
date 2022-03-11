<template lang="html">
  <div class="profilePage">
    <div class="header">
      <div class="imageContainer">
        <img id="avatar" :src="me.images[0].url" />
      </div>
      <div id="name">
        {{ this.id }}
      </div>
      <div id="about">
        {{ me.display_name }} <br />
        {{ me.followers.total }} followers <br />

        <div
          v-if="this.currentlyPlaying.is_playing == true"
          class=" currentlyPlayingDiv"
        >
          Listning to: {{ currentlyPlaying.item.artists[0].name }} -
          {{ currentlyPlaying.item.name }}
        </div>
      </div>
    </div>
    <div class="blocks">
      <topArtists v-for="block in topArtists.blocks" :key="block" />
      <recentlyPlayedTracks
        v-for="block in recentlyPlayedTracks.blocks"
        :key="block"
      />
      <topTracks v-for="block in topTracks.blocks" :key="block" />
      <albums v-for="block in albums.blocks" :key="block" />
      <ProfileBlock v-for="block in profile.blocks" :key="block" />
    </div>
  </div>
</template>

<script>
import ProfileBlock from '@/components/ProfileBlock'
import albums from '@/components/albums'
import topArtists from '@/components/topArtists'
import topTracks from '@/components/topTracks'
import spotifyApi from '../mixins/spotifyApi.js'
import recentlyPlayedTracks from '@/components/recentlyPlayedTracks'
//import followedArtists from '@/components/followedArtists'
export default {
  data() {
    return {
      id: this.$route.params.id,
      name: 'hello',
      topArtists: {
        about: 'This is the about section of the artists.',
        blocks: [1]
      },
      topTracks: {
        about: 'This is the about section of the tracks.',
        blocks: [2]
      },
      albums: {
        about: 'This is the about section of the albums.',
        blocks: [3]
      },
      profile: {
        about: 'This is the about section of the playlists.',
        blocks: [4]
      },
      recentlyPlayedTracks: {
        about: 'This is the about section of the rpd.',
        blocks: [5]
      },
      followedArtists: {
        about: 'This is the about section of the followed artists.',
        blocks: [6]
      },
      me: '',
      currentlyPlaying: ''
    }
  },
  mixins: [spotifyApi],
  async mounted() {
    this.me = await this.getMe(this.id)
    this.currentlyPlaying = await this.getMyCurrentPlaybackState(this.id)
  },
  components: {
    ProfileBlock,
    albums,
    topArtists,
    topTracks,
    recentlyPlayedTracks
    //followedArtists
  },
  watch: {
    '$route.params.id': function(id) {
      this.updateProfile(id)
    }
  },
  methods: {
    updateProfile(id) {
      this.id = id
    }
  }
}
</script>

<style lang="scss" scoped>
.blocks {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 70px;
}

.header {
  display: block;
  padding-left: 20px;
  background-color: #2b2a2a;
  text-align: left;
  height: 130px;
  margin-left: 25px;
  margin-right: 25px;
  border-radius: 10px;
}
#avatar {
  border-radius: 50%;
  width: 160px;
  height: 160px;
  margin: auto;
  background-color: white;
}
.imageContainer {
  position: absolute;
  display: flex;
  align-items: center;
  background-color: #555555;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  margin-top: 10px;
}
#name {
  position: absolute;
  margin-top: 20px;
  margin-left: 180px;
  font-weight: bold;
  color: #ffffff;
  font-size: 24px;
}
#about {
  position: absolute;
  max-height: 70px;
  overflow: scroll;
  margin-right: 60px;
  margin-top: 55px;
  margin-left: 180px;
}

.currentlyPlayingDiv {
  font-weight: bolder;
}
</style>
