import Vue from 'vue'
import {
  CHECK_BROWSER_TYPE
} from '@/store/mutation-types'

let initialState = {
  browserType: null,
}

// initial state
const state = Vue.util.extend({}, initialState)

// getters
const getters = {
  browserType: function (state) {
    return state.browserType
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
  // [CHECK_RESET_EMAIL_STATUS]: function (state) {
  //   // 정확한 방법이 아직없는걸로 보임.. 일단 보류
  // },

}

export default {
  state,
  getters,
  actions,
  mutations
}
