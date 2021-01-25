import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
    console.log(to, 'to')
    if (to.matched.some(record => record.meta.requiresLogin)) {
        // 判断是否已登录
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        // 未登录则跳转到登录界面
        next('/login');
    } else if (to.matched.some(record => record.meta.requiresNotLogin)) {
        console.log(store.getters.isLoggedIn, 'to')
        // 判断是否已登录
        if (!store.getters.isLoggedIn) {
            next();
            return;
        }
        // 已登录跳转到首页
        next('/');
    } else {
        next()
    }
})