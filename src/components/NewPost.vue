<template>
  <div class="post">
    <p class="user">{{ getFullName }}</p>
    <div class="closeButton" @click="close">✕</div>
    <textarea
      name="postText"
      rows="1"
      v-model="postText"
      placeholder="Write about something here"
    ></textarea>
    <div class="postButton" @click="onPost">
      <p class="buttonText">Post</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions(['addPost']),
    close() {
      this.$emit('close')
    },
    onPost() {
      if (this.postText !== '') {
        this.addPost(this.postText)
      }
      this.close()
    }
  },
  computed: {
    ...mapGetters(['getFullName'])
  },
  data() {
    return {
      postText: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  max-width: 700px;
  background-color: rgba(#ffffff, 0.11);
  border-radius: 15px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  text-align: left;
}
.user {
  color: #42b983;
  font-weight: bolder;
  padding-right: 6px;
  display: inline;
}
.closeButton {
  position: relative;
  float: right;
  top: -10px;
  right: -10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  line-height: 27px;
  font-weight: bolder;
  font-size: 15px;

  background-color: rgba(#121212, 0.35);
  transition: all 0.2s linear;
  cursor: pointer;
  &:hover {
    background-color: rgba(#121212, 0.7);
  }
}
.postButton {
  position: relative;
  float: right;
  text-align: center;
  width: 50px;
  padding: 10px;
  border-radius: 30px;

  background-color: rgb(36, 61, 33);
  transition: all 0.1s ease;
  cursor: pointer;
  &:hover {
    background-color: rgb(38, 68, 34);
  }
}
.buttonText {
  color: #ffffff;
  font-weight: bolder;
  margin: auto;
}
.text {
  color: rgba(#ffffff, 0.87);
  display: block;
  word-wrap: normal;
  margin-top: 5px;
  margin-bottom: 5px;
}
textarea {
  @extend .text;

  background-color: rgba(0, 0, 0, 0);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  height: auto;
  width: 100%;
  max-width: 700px;
  border: none;
  outline: none;
  resize: none;
  overflow: auto;
}
</style>
