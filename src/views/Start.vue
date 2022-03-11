<template>
  <div>
    <img src="../assets/logo.png" id="logo" />
    <h1>MusicProfiles</h1>
    <transition name="appear">
      <div class="message" v-if="this.message">{{ this.message }}</div>
    </transition>
    <div class="forms">
      <transition name="slideRight">
        <LogIn class="form" v-if="showLogin" @toSignUp="showLogin = false" />
      </transition>
      <transition name="slideLeft">
        <SignUp
          class="form"
          v-if="!showLogin"
          @toLogin="showLogin = true"
          @signedUp="signedUp"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SignUp from '@/components/SignUp'
import LogIn from '@/components/LogIn'
export default {
  data() {
    return {
      showLogin: true,
      message: ''
    }
  },
  components: {
    LogIn,
    SignUp
  },
  methods: {
    login() {
      this.$store.state.loggedIn = true
    },
    signedUp() {
      this.showLogin = true
      this.message = this.getStatus.message
    }
  },
  computed: {
    ...mapGetters(['getStatus'])
  }
}
</script>

<style lang="scss" scoped>
#logo {
  height: 150px;
  width: 150px;
}
.message {
  padding-bottom: 20px;
  color: #42b983;
  font-weight: bold;
}
.form {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
.slideRight-enter-active,
.slideLeft-enter-active {
  transition: all 1.5s ease;
}
.slideRight-leave-active,
.slideLeft-leave-active {
  transition: all 1s ease;
}
.slideRight-enter,
.slideLeft-enter {
  transform: scale(0.5);
  opacity: 0;
}
.slideRight-leave-to {
  transform: translateX(350px);
  opacity: 0;
}
.slideLeft-leave-to {
  transform: translateX(-350px);
  opacity: 0;
}

.appear-enter-active,
.appear-leave-active {
  transition: all 0.5s ease;
}
.appear-enter,
.appear-leave-to {
  transform: scale(0.2);
  opacity: 0;
}
</style>
