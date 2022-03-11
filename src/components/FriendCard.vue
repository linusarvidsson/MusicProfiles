<template>
  <div class="container">
    <router-link
      :to="{
        name: 'profile',
        params: { id: this.profile.username }
      }"
    >
      <div class="profile-card">
        <div class="imageContainer">
          <img id="avatar" src="../assets/logo.png" />
        </div>
        <div class="card-right">
          <div class="username">{{ this.profile.username }}</div>
          <div v-if="!this.isMe && this.isFriend" class="friend">
            friends
          </div>
          <div v-if="this.isMe" class="friend">
            you
          </div>
          <div class="name">{{ this.profile.name }}</div>
        </div>
      </div>
    </router-link>
    <div
      v-if="!this.isMe && !this.isFriend"
      class="addFriend"
      @click="onAddFriend"
    >
      + Add friend
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import spotifyApi from '../mixins/spotifyApi.js'
export default {
  props: {
    profile: Object
  },
  data() {
    return {
      //isFriend: false,
      isMe: false,
      profileImage: ''
    }
  },
  mixins: [spotifyApi],
  async mounted() {
    this.profileImage = await this.getMe().images[0].url
  },
  computed: {
    ...mapGetters(['getFriends', 'getUsername']),
    isFriend() {
      let friends = this.getFriends
      for (var i = 0; i < friends.length; i++) {
        if (friends[i] == this.profile.username) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    ...mapActions(['addFriend']),
    onAddFriend() {
      this.addFriend(this.profile.username)
      this.$emit('friendAdded', this.profile)
    }
  },
  created() {
    if (this.profile.username == this.getUsername) this.isMe = true
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
}
.profile-card {
  max-width: 450px;
  height: 80px;
  background-color: rgba(#ffffff, 0.05);
  border-radius: 10px;
  padding: 20px;
  padding-left: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
  a {
    text-decoration: none;
  }
  &:hover {
    background-color: rgba(#ffffff, 0.09);
  }
}
#avatar {
  border-radius: 50%;
  width: 90px;
  height: 90px;
  margin: auto;
  background-color: white;
}
.imageContainer {
  position: absolute;
  display: flex;
  align-items: center;
  background-color: #555555;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: -10px;
}
.card-right {
  position: relative;
  margin-right: 115px;
  height: 80px;
  text-align: left;
  left: 115px;
}
.username {
  display: inline;
  font-size: 15px;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 3px;
  overflow: hidden;
}
.friend {
  display: inline;
  color: white;
  float: right;
  font-size: 14px;
}
.addFriend {
  z-index: 1;
  position: absolute;
  top: 10px;
  right: 10px;
  float: right;
  background-color: rgb(36, 61, 33);
  color: #ffffff;
  font-weight: bolder;
  padding: 8px;
  font-size: 12px;
  border-radius: 30px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: rgb(38, 68, 34);
  }
}
.name {
  font-size: 20px;
  font-weight: bold;
  color: rgba(#ffffff, 0.87);
}
</style>
