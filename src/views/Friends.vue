<template>
  <div id="friends-list">
    <div class="searchBox">
      <input
        v-model="userSearch"
        type="text"
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
    </div>
    <br />
    {{ this.searchMessage }}
    <FriendCard
      v-for="person in searchResult"
      :profile="person"
      :key="person._id"
      @friendAdded="updateFriends"
    ></FriendCard>

    <div v-if="searchResult.length > 0 || offset > 0" class="navContainer">
      <div
        class="nav"
        @click="
          if (offset > 0) offset -= limit
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
      <div
        class="nav"
        @click="
          if (searchResult.length == limit) offset += limit
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
    </div>

    <h1>Your Friends</h1>
    <FriendCard
      v-for="friend in friends"
      :profile="friend"
      :key="friend.id"
    ></FriendCard>
  </div>
</template>

<script>
import FriendCard from '@/components/FriendCard.vue'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  components: {
    FriendCard
  },
  data() {
    return {
      friends: [],
      userSearch: '',
      offset: 0,
      limit: 5,
      searchResult: [],
      searchMessage: ''
    }
  },
  computed: {
    ...mapGetters(['getFriends'])
  },
  methods: {
    async search() {
      let response = (
        await axios.get('http://localhost:3000/users/search', {
          headers: { Authorization: `Bearer ${localStorage.token}` },
          params: {
            query: this.userSearch,
            offset: this.offset,
            limit: this.limit
          }
        })
      ).data

      this.searchResult = response.result
      this.searchMessage = response.message

      console.log('searching')
    },
    updateFriends(user) {
      this.friends.push({ username: user.username, name: user.name })
    }
  },
  async created() {
    let friendsList = this.getFriends
    for (var i = 0; i < friendsList.length; i++) {
      let friend = (
        await axios.get('http://localhost:3000/users', {
          headers: { Authorization: `Bearer ${localStorage.token}` },
          params: { user: friendsList[i] }
        })
      ).data.user
      this.friends.push({
        username: friendsList[i],
        name: friend.firstname + ' ' + friend.lastname
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#friends-list {
  padding: 0 20px;
}
.searchBox {
  position: relative;
  left: 20px;
}
.searchInput {
  text-align: left;
  width: 250px;
}
.searchButton {
  display: inline-block;
  position: relative;
  left: 10px;
  top: 8px;
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
.nav {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: auto;
  margin-right: 5px;
  margin-left: 5px;
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
