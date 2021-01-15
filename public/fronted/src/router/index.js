import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Login from '@/views/login'
import Register from '@/views/register'

console.log(Index, 'index')
Vue.use(Router)

const routes = [{
    path: '/',
    redirect: '/index',
}, {
    name: 'index',
    path: '/index',
    component: Index,
}, {
    name: 'login',
    path: '/login',
    component: Login
}, {
    name: 'register',
    path: '/register',
    component: Register
}]

export default new Router({ routes })