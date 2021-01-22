import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: ''
    },
    mutations: {
        // 改变token
        SET_TOKEN(state, token) {
            state.token = token
        }
    },
    actions: {
        Login() {

        }
    }
})