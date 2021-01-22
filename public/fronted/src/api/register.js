import request from '@/utils/request'

export function apiRegister(data) {
    return request({
        url: '/register',
        // url: '/rest/version/get/newlest',
        method: 'post',
        data
    })
}