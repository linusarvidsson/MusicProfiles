<template>
  <div class="browser">
    <input
      v-model="searchString"
      type="text"
      name="search"
      class="searchInput"
      @keyup.enter="search"
    />
    <div class="searchButton" @click="search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
        fill="white"
        width="25px"
        height="25px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
      </svg>
    </div>
    <div
      :style="
        searchType == 'Tracks'
          ? { 'background-color': 'rgb(36, 61, 33)' }
          : null
      "
      class="typeButton"
      @click="
        searchType = 'Tracks'
        offset = 0
        search()
      "
    >
      Tracks
    </div>
    <div
      :style="
        searchType == 'Albums'
          ? { 'background-color': 'rgb(36, 61, 33)' }
          : null
      "
      class="typeButton"
      @click="
        searchType = 'Albums'
        offset = 0
        search()
      "
    >
      Albums
    </div>
    <div
      :style="
        searchType == 'Artists'
          ? { 'background-color': 'rgb(36, 61, 33)' }
          : null
      "
      class="typeButton"
      @click="
        searchType = 'Artists'
        offset = 0
        search()
      "
    >
      Artists
    </div>
    <div
      :style="
        searchType == 'Playlists'
          ? { 'background-color': 'rgb(36, 61, 33)' }
          : null
      "
      class="typeButton"
      @click="
        searchType = 'Playlists'
        offset = 0
        search()
      "
    >
      Playlists
    </div>
    <SearchItem
      v-for="item in searchResult"
      :key="item.id"
      :item="item"
      @itemSelected="itemSelected(item)"
    />

    <div v-if="searchResult.length > 0 || offset > 0" class="navContainer">
      <div
        v-if="searchResult.length > 0"
        class="nav"
        @click="
          offset += 5
          search()
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="18px"
          height="18px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </div>
      <div
        class="nav"
        @click="
          if (offset > 0) offset -= 5
          search()
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="18px"
          height="18px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import spotifyApi from '../mixins/spotifyApi'
import SearchItem from '@/components/SearchItem.vue'

export default {
  data() {
    return {
      searchType: 'Tracks',
      searchString: '',
      searchResult: [],
      offset: 0
    }
  },
  computed: {
    page() {
      return 1 + this.offset / 5
    }
  },
  components: {
    SearchItem
  },
  mixins: [spotifyApi],
  methods: {
    async search() {
      let options = { limit: 5, offset: this.offset }

      if (this.searchType == 'Tracks') {
        this.searchResult = await this.searchTracks(this.searchString, options)
      } else if (this.searchType == 'Albums') {
        this.searchResult = await this.searchAlbums(this.searchString, options)
      } else if (this.searchType == 'Artists') {
        this.searchResult = await this.searchArtists(this.searchString, options)
      } else if (this.searchType == 'Playlists') {
        this.searchResult = await this.searchPlaylists(
          this.searchString,
          options
        )
      }
    },
    itemSelected(item) {
      this.$emit('itemSelected', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.browser {
  width: 400px;
  background-color: rgba(#ffffff, 0.05);
  padding: 15px;
  border-radius: 15px;
  margin: auto;
}
.searchInput {
  width: 300px;
  text-align: left;
}
.searchButton {
  display: relative;
  float: right;
  top: -10px;
  right: -100px;

  width: 25px;
  height: 25px;
  border-radius: 50%;

  background-color: rgb(36, 61, 33);
  padding: 10px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: rgb(38, 68, 34);
  }
}
.typeButton {
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
  //margin: 10px;
  background-color: rgb(48, 48, 48);
  color: #ffffff;
  font-weight: bolder;
  padding: 10px;
  font-size: 14px;
  border-radius: 30px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: rgb(54, 54, 54);
  }

  &:selected {
    background-color: rgb(36, 61, 33);
  }
}
.navContainer {
  height: 30px;
}
.nav {
  position: relative;
  float: right;
  bottom: -8px;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  border-radius: 50%;

  background-color: rgb(47, 46, 46);
  padding: 5px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: rgb(64, 63, 63);
  }
}
</style>
