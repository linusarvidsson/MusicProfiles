<template>
  <div>
    <div id="loginbox" class="loginbox">
      <h2>Log In</h2>
      <form @submit.prevent="onLogin">
        <label for="username">Username</label><br />
        <input
          v-model="form.username"
          type="text"
          name="username"
          required
        /><br />
        <label for="password">Password</label><br />
        <input
          v-model="form.password"
          type="password"
          name="password"
          required
        /><br />
        <div class="message">{{ message }}</div>
        <input
          type="submit"
          name="login"
          value="Log In"
          class="greenButton"
          id="loginbutton"
        />
      </form>
    </div>
    <br />
    <p>Create your profile today.</p>
    <div class="signUpButton" @click="onSignUp">
      <p class="buttonText">Sign Up</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      message: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    async onLogin() {
      await this.login(this.form)
      let status = this.getStatus
      if (status.success) {
        this.$emit('signedUp')
      } else {
        this.message = status.message
      }
      //this.$store.state.loggedIn = true
    },
    onSignUp() {
      this.$emit('toSignUp')
    }
  },
  computed: {
    ...mapGetters(['getStatus'])
  }
}
</script>

<style lang="scss" scoped>
#loginbox {
  background-color: rgba(#ffffff, 0.05);
  width: 350px;
  margin: auto;
  padding-top: 1px;
  padding-bottom: 8px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.15);
  border-radius: 20px;
}
#loginbutton {
  width: 90px;
}
input {
  width: 230px;
}
.signUpButton {
  background-color: rgba(#ffffff, 0.07);
  width: 110px;
  padding: 13px;
  border-radius: 30px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  transition: all 0.2s ease;

  cursor: pointer;
  &:hover {
    background-color: rgba(#ffffff, 0.09);
  }
}
.buttonText {
  color: #ffffff;
  font-weight: bolder;
  margin: auto;
}
</style>
