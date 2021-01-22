import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
    // 检测路由配置中是否有requiresAuth这个meta属性
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 判断是否已登录
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        // 未登录则跳转到登录界面
        next('/login');
    } else {
        next()
    }
})