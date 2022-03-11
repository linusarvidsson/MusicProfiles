import Vue from 'vue'
import VueRouter from 'vue-router'
import Timeline from '../views/Timeline.vue'
import Profile from '../views/Profile.vue'
import Friends from '../views/Friends.vue'
import Spotify from '../views/Spotify.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'timeline',
    component: Timeline
  },
  {
    path: '/friends',
    name: 'friends',
    component: Friends
  },
  {
    path: '/spotify',
    name: 'spotify',
    component: Spotify
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: Profile,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
