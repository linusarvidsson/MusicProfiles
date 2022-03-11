<template lang="html">
  <div>
    <div id="signupbox" class="signupbox">
      <h2>Sign Up</h2>
      <form @submit.prevent="signUp">
        <div class="name" id="firstname">
          <label for="firstname">First name</label><br />
          <input
            v-model="form.firstname"
            class="nameinput"
            type="text"
            name="firstname"
            required
          />
        </div>
        <div class="name">
          <label for="last name">Last name</label><br />
          <input
            v-model="form.lastname"
            class="nameinput"
            type="text"
            name="lastname"
            required
          />
        </div>
        <br />
        <label for="email">Email</label><br />
        <input
          v-model="form.email"
          class="signupinput emailinput"
          type="email"
          name="email"
          required
        /><br />
        <label for="username">Username</label><br />
        <input
          v-model="form.username"
          class="signupinput"
          type="text"
          name="username"
          required
        /><br />
        <label for="password">Password</label><br />
        <input
          v-model="form.password"
          class="signupinput"
          type="password"
          name="password"
          required
        /><br />
        <label for="repeatPassword">Repeat Password</label><br />
        <input
          v-model="form.repeatPassword"
          class="signupinput"
          type="password"
          name="repeatPassword"
          required
        /><br />
        <div class="message">{{ message }}</div>
        <input
          type="submit"
          name="signUp"
          value="Sign Up"
          class="greenButton"
          id="signUpButton"
        />
      </form>
    </div>

    <p>Already have an account?</p>
    <div class="loginButton" @click="onLogin">
      <p class="buttonText">Log In</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {
        email: '',
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        repeatPassword: ''
      },
      message: ''
    }
  },
  methods: {
    ...mapActions(['register']),
    async signUp() {
      if (this.form.password == this.form.repeatPassword) {
        console.log('hello')
        await this.register(this.form)
        let status = this.getStatus
        if (status.success) {
          this.$emit('signedUp')
        } else {
          this.message = status.message
        }
      } else {
        this.message = 'Passwords does not match'
      }
    },
    onLogin() {
      this.$emit('toLogin')
    }
  },
  computed: {
    ...mapGetters(['getStatus'])
  }
}
</script>

<style lang="scss" scoped>
#signupbox {
  background-color: rgba(#ffffff, 0.05);
  width: 420px;
  margin: auto;
  padding-top: 1px;
  padding-bottom: 8px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.15);
  border-radius: 20px;
}
#signUpButton {
  width: 90px;
}
#firstname {
  padding-right: 22px;
}
.name {
  display: inline-block;
}
.signupinput {
  width: 300px;
}
.nameinput {
  width: 125px;
}
.loginButton {
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
    background-color: rgba(#ffffff, 0.1);
  }
}
.buttonText {
  color: #ffffff;
  font-weight: bolder;
  margin: auto;
}
</style>
