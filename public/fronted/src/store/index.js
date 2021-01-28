import Vue from 'vue'
import Vuex from 'vuex'
import { apiLogin } from '/src/api/login.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        userInfo: {},
        isLoggedIn: false
    },
    mutations: {
        // 改变token
        SET_TOKEN(state, token) {
            console.log('settoken')
            state.token = token
        },
        SET_USER(state, userInfo) {
            state.userInfo = userInfo
            console.log("state-userinfo", state.userInfo)
        }
    },
    actions: {
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                apiLogin(userInfo).then(res => {
                    commit('SET_TOKEN', res.token)
                    commit('SET_USER', res.value.userInfo)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Logout({ commit }) {
            commit('SET_TOKEN', '')
            commit('SET_USER', {})
        }
    },
    getters: {
        // !!将state.token强制转换为布尔值，若state.token存在且不为空(已登录)则返回true，反之返回false
        isLoggedIn: state => !!state.token,
        token: state => state.token,
        userInfo: state => state.userInfo
    }
})

export default store;