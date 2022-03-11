import axios from 'axios'

const state = {
  loggedIn: false,
  status: {},
  user: {}
}

const getters = {
  isLoggedIn: state => state.loggedIn,
  getStatus: state => state.status,
  getUsername: state => state.user.username,
  getFullName: state => state.user.firstname + ' ' + state.user.lastname,
  getFriends: state => state.user.friends
}

const actions = {
  async login({ commit }, form) {
    const response = await axios.post('http://localhost:3000/login', form)
    if (response.data.success) {
      commit('updateUser', response.data)
      localStorage.token = response.data.token
    } else {
      commit('setStatus', response.data)
    }
  },
  async register({ commit }, form) {
    const response = await axios.post('http://localhost:3000/signup', form)
    commit('setStatus', response.data)
  },
  async getUserByToken({ commit }) {
    const response = await axios.get('http://localhost:3000/users', {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
    if (response.data.success) {
      commit('updateUser', response.data)
    }
  },
  async addFriend({ commit }, user) {
    await axios.post(
      'http://localhost:3000/users/addFriend',
      { user: user },
      {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      }
    )
    commit('pushFriend', user)
  }
}

const mutations = {
  setStatus: (state, response) =>
    (state.status = { success: response.success, message: response.message }),
  updateUser: (state, response) => {
    state.status = { success: response.success, message: response.message }
    state.user = response.user
    state.loggedIn = true
  },
  pushFriend: (state, user) => state.user.friends.push(user)
}

export default {
  state,
  getters,
  actions,
  mutations
}
