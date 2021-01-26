import Vue from 'vue'
import Vuex from 'vuex'
import { apiLogin } from '/src/api/login.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        userInfo: '',
        isLoggedIn: false
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
                commit('SET_TOKEN', res.token)
                commit('SET_USER', res.value.userInfo)
            })
        }
    },
    getters: {
        // !!将state.token强制转换为布尔值，若state.token存在且不为空(已登录)则返回true，反之返回false
        isLoggedIn: state => !!state.token,
        token: state => state.token
    }
})

export default store;