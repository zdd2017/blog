import Vue from 'vue'
import Vuex from 'vuex'
import { apiLogin } from '/src/api/login.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        userInfo: ''
    },
    mutations: {
        // 改变token
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USER(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    actions: {
        Login({ commit }, userInfo) {
            console.log("login")
            apiLogin(userInfo).then(res => {
                commit('SET_TOKEN', res.value.token)
                commit('SET_USER', res.value.userInfo)
            })
        }
    }
})

export default store;