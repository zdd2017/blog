import request from '@/utils/request'

export function apiPost(data) {
    return request({
        url: '/post',
        method: 'post',
        data
    })
}

export function apiModify(id, data) {
    return request({
        url: '/modify',
        method: 'post',
        params: { id: id },
        data
    })
}