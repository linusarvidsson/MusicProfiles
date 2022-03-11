<template>
  <div id="timeline">
    <h1>Timeline</h1>
    <div class="newPostButton" v-if="!newPost" @click="this.newPostSwitch">
      <p class="buttonText">New Post</p>
    </div>
    <transition name="fade">
      <NewPost v-if="newPost" @close="newPostSwitch" />
    </transition>
    <Post v-for="post in allPosts" :post="post" :key="post._id" />
  </div>
</template>

<script>
import Post from '@/components/Post.vue'
import NewPost from '@/components/NewPost.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Post,
    NewPost
  },
  methods: {
    ...mapActions(['fetchPosts']),
    newPostSwitch() {
      this.newPost = !this.newPost
    }
  },
  computed: {
    ...mapGetters(['allPosts'])
  },
  data() {
    return {
      newPost: false
    }
  },
  created() {
    this.fetchPosts()
  }
}
</script>

<style lang="scss" scoped>
#timeline {
  padding: 0 20px;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  transform: scale(0.6);
  opacity: 0;
}
.newPostButton {
  background-color: rgb(36, 61, 33);
  width: 110px;
  padding: 13px;
  border-radius: 30px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
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
</style>
