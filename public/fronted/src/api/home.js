import request from '@/utils/request'

export function apiViewMyArticle(name) {
    return request({
        url: '/getMyArticle',
        method: 'get',
        params: {
            username: name
        }
    })
}