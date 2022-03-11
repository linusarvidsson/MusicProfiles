import axios from 'axios'

const state = {
  posts: []
}

const getters = {
  allPosts: state => state.posts
}

const actions = {
  async fetchPosts({ commit }) {
    const response = await axios.get('http://localhost:3000/posts', {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
    commit('setPosts', response.data)
  },
  async addPost({ commit, rootGetters }, text) {
    let user = rootGetters.getUsername
    let name = rootGetters.getFullName

    const response = await axios.post(
      'http://localhost:3000/posts',
      { user, name, text },
      {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      }
    )
    commit('newPost', response.data)
  },
  async deletePost({ commit }, id) {
    await axios.delete(
      'http://localhost:3000/posts',
      { id },
      {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      }
    )
    commit('removePost', id)
  }
}

const mutations = {
  setPosts: (state, posts) => (state.posts = posts.reverse()),
  newPost: (state, post) => state.posts.unshift(post),
  removePost: (state, id) =>
    (state.posts = state.posts.filter(post => post._id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
