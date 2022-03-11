<template>
  <div id="app">
    <div v-if="isLoggedIn && !loading">
      <NavBar />
      <router-view />
    </div>
    <Start v-if="!isLoggedIn && !loading" />
    <div v-if="loading" class="loadingBox">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Start from '@/views/Start.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Start,
    NavBar
  },
  methods: {
    ...mapActions(['getUserByToken'])
  },
  async created() {
    if (localStorage.token) {
      await this.getUserByToken()
      if (!this.isLoggedIn) {
        localStorage.removeItem('token')
      }
    }
    if (!this.isLoggedIn && this.$route.path !== '/') {
      this.$router.push('/')
    }
    this.loading = false
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  data: function() {
    return {
      loading: true
    }
  }
}
</script>

<style lang="scss">
html {
  background-color: #121212;
}
h1,
h2 {
  color: #ffffff;
}
a {
  text-decoration: none;
}
label {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
}
input {
  background-color: rgba(#ffffff, 0.85);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 6px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 20px;
  border: none;
  outline: none;
  color: #121212;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 4px;
  margin-bottom: 10px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  //color: #2c3e50;
  color: rgba(#ffffff, 0.6);
}
.greenButton {
  margin: 10px;
  background-color: rgb(36, 61, 33);
  color: #ffffff;
  font-weight: bolder;
  padding: 10px;
  font-size: 14px;
  border-radius: 30px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: rgb(38, 68, 34);
  }
}
.message {
  color: #cf6679;
  font-weight: bold;
  padding: 10px;
}
.loadingBox {
  width: 80px;
  height: 80px;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #42b983;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
