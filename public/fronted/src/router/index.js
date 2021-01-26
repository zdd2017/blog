import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Login from '@/views/login'
import Register from '@/views/register'
import Post from '@/views/post'

Vue.use(Router)

const routes = [{
    path: '/',
    redirect: '/index',
}, {
    name: 'index',
    path: '/index',
    meta: {
        requiresLogin: true
    },
    component: Index,
}, {
    name: 'login',
    path: '/login',
    meta: {
        requiresNotLogin: true
    },
    component: Login
}, {
    name: 'register',
    path: '/register',
    meta: {
        requiresNotLogin: true
    },
    component: Register
}, {
    name: 'post',
    path: '/post',
    meta: {
        requiresLogin: true
    },
    component: Post
}]

export default new Router({ routes })