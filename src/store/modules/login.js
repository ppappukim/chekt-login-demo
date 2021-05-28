import Vue from 'vue'
import {
  GET_EMAIL_INPUT_INFO

} from '@/store/mutation-types'

let initialState = {
  email: null,
}

// initial state
const state = Vue.util.extend({}, initialState)

// getters
const getters = {
  emailInputInfo: function (state) {
    return state.email
  },
}
// actions
const actions = {
}

// mutations
const mutations = {
  [GET_EMAIL_INPUT_INFO]: function (state, email) {
    state.email = email
    console.log('bobby!', email);
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
