<template lang="html">
  <div id="nav" class="nav">
    <router-link to="/">Timeline</router-link> |
    <router-link :to="{ name: 'friends' }">Friends</router-link> |
    <router-link :to="{ name: 'spotify' }">Spotify</router-link>
    |
    <router-link
      :to="{
        name: 'profile',
        params: {
          id: getUsername
        }
      }"
      >Profile</router-link
    >
    <div
      :class="{ settingsOpen }"
      class="dropdown"
      @click="settingsOpen = !settingsOpen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        id="settingsIcon"
      >
        <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
        <path
          d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"
        />
      </svg>
      <div class="dropdownList" v-if="settingsOpen">
        <div class="user">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            id="userIcon"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"
            />
          </svg>
          <br />
          {{ getUsername }}
        </div>
        <div class="dropdownItem" id="dropdownTop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            id="menuIcon"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
            />
          </svg>
          Settings
        </div>
        <div class="dropdownItem" id="dropdownBottom" @click="logOut">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            id="menuIcon"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M10.79 16.29c.39.39 1.02.39 1.41 0l3.59-3.59c.39-.39.39-1.02 0-1.41L12.2 7.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L12.67 11H4c-.55 0-1 .45-1 1s.45 1 1 1h8.67l-1.88 1.88c-.39.39-.38 1.03 0 1.41zM19 3H5c-1.11 0-2 .9-2 2v3c0 .55.45 1 1 1s1-.45 1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v3c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
            />
          </svg>
          Log Out
        </div>
      </div>
    </div>
    <hr class="navline" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      settingsOpen: false,
      user: this.$store.state.user
    }
  },
  computed: {
    ...mapGetters(['getUsername', 'getFullName'])
  },
  methods: {
    logOut() {
      localStorage.removeItem('token')
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
#nav {
  padding: 10px;
  word-spacing: 3px;
  a {
    font-weight: bold;
    font-size: 17px;
    //color: #2c3e50;
    color: rgba(#ffffff, 0.38);

    &:hover {
      color: rgba(#ffffff, 0.87);
    }

    &.router-link-exact-active {
      color: #42b983;
      font-size: 24px;
    }
  }
}
#settingsIcon {
  fill: rgba(#121212, 0.8);
  width: 100%;
  height: auto;
  display: block;
  margin: auto;
}
.dropdown {
  display: flex;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  background-color: rgba(#ffffff, 0.15);
  z-index: 1;
  cursor: pointer;

  &:hover,
  &.settingsOpen {
    background-color: rgba(#ffffff, 0.25);
    #settingsIcon {
      fill: rgba(#ffffff, 0.7);
    }
  }
}
.dropdownList {
  background-color: #303030;
  position: absolute;
  border-radius: 12px;
  top: 110%;
  right: 0%;
  width: 210px;
  color: #ffffff;
}
.user {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #1c1b1b;
  padding: 5px;
  color: #4e4e4e;
  font-weight: bold;
  font-size: 13px;
  cursor: auto;
}
#userIcon {
  fill: #4e4e4e;
}
.dropdownItem {
  padding: 6px;
  padding-left: 10px;
  border-top: solid 1px;
  border-color: #212121;
  &:hover {
    background-color: #464646;
  }
}
#dropdownBottom {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
#menuIcon {
  fill: rgba(#121212, 0.8);
  position: absolute;
  right: 78%;
}
.brand {
  align-self: flex-start;
  color: #42b983;
  font-size: 24px;
  font-weight: bolder;
  display: inline;
}
hr.navline {
  border: 1px solid rgba(#ffffff, 0.6);
}
</style>
