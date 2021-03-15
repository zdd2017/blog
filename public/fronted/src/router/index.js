import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Login from '@/views/login'
import Register from '@/views/register'
import Post from '@/views/post'
import Blog from '@/views/blog'
import Home from '@/views/home'

Vue.use(Router)

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {

    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

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
}, {
    name: 'blog',
    path: '/blog',
    meta: {
        requiresLogin: true
    },
    component: Blog
}, {
    name: 'home',
    path: '/home',
    meta: {
        requiresLogin: true
    },
    component: Home
}]

export default new Router({ routes })