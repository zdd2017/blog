import request from '@/utils/request'

export function apiPost(data) {
    return request({
        url: '/post',
        method: 'post',
        data
    })
}