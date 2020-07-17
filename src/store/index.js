import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || '',
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {}
  },
  mutations: {
    // 保存token
    setToken (state, token) {
      console.log(token)
      sessionStorage.setItem('token', token)
      state.token = token
    },
    // 保存登录信息
    setUserInfo (state, userInfo) {
      console.log(userInfo)
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      state.userInfo = userInfo
    }
  },
  actions: {
    updateToken (context, value) {
      context.commit('setToken', value)
    },
    updateUserInfo (context, value) {
      context.commit('setUserInfo', value)
    }
  },
  modules: {
  }
})
