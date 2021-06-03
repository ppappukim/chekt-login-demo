import Vue from 'vue'
import {
  CHECK_BROWSER_TYPE,
  CHECK_RESET_EMAIL_VERIFY_STATUS,
  CHECK_RESET_EMAIL_CONFIRM_STATUS,
  CHECK_PASSWORDLESS_CONFIRM_STATUS,
} from '@/store/mutation-types'

let initialState = {
  browserType: null,
  resetEmailVerifyStatus: null,
  resetEmailConfirmStatus: null,
  passwordlessConfirmStatus: null,
}

// initial state
const state = Vue.util.extend({}, initialState)

// getters
const getters = {
  browserType: function (state) {
    return state.browserType
  },
  resetEmailVerifyStatus: function (state) {
    return state.resetEmailVerifyStatus
  },
  resetEmailConfirmStatus: function (state) {
    return state.resetEmailConfirmStatus
  },
  passwordlessConfirmStatus: function (state) {
    return state.passwordlessConfirmStatus
  },
}
// actions
const actions = {
}

// mutations
const mutations = {
  [CHECK_BROWSER_TYPE]: function (state) {
    console.log('CHECK_BROWSER_TYPE');
    // 정확한 방법이 아직없는걸로 보임.. 일단 보류
  },
  [CHECK_RESET_EMAIL_VERIFY_STATUS]: function (state, data) {
    console.log('CHECK_RESET_EMAIL_VERIFY_STATUS');
    state.resetEmailVerifyStatus = data
  },
  [CHECK_RESET_EMAIL_CONFIRM_STATUS]: function (state, data) {
    console.log('CHECK_RESET_EMAIL_CONFIRM_STATUS');
    state.resetEmailConfirmStatus = data
  },
  [CHECK_PASSWORDLESS_CONFIRM_STATUS]: function (state, data) {
    console.log('CHECK_PASSWORDLESS_CONFIRM_STATUS');
    state.passwordlessConfirmStatus = data
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
