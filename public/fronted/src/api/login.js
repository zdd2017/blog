import request from '@/utils/request'

export function apiLogin(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

// export function apiLogout() {
//     return request({
//         url: '/logout',
//         method: 'post'
//     })
// }