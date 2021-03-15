import request from '@/utils/request'

export function apiGetBlogList() {
    return request({
        url: '/getBlogList',
        method: 'get'
    })
}

export function apiViewArticle(id) {
    return request({
        url: '/getArticle',
        method: 'get',
        params: {
            id: id
        }
    })
}