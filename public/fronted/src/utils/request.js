import axios from 'axios'
import { Message } from 'element-ui'
// import { Store } from 'express-session'
import store from '../store'

// 创建axios实例
const service = axios.create({
    baseURL: '/api/', // api 的 base_url
    timeout: 70000 // 请求超时时间
})

// console.log(process.env, 'BASE')
// request拦截器
service.interceptors.request.use(
    request => {
        console.log('token:', store.getters.token)
        if (store.getters.token) {
            // console.log('set token')
            request.headers['token'] = store.getters.token;
        }
        return request;
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        const res = response.data

        if (!res.retcode) {
            return response.data
        }

        if (res.retcode !== 0) {
            Message({
                message: res.text,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 2 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
