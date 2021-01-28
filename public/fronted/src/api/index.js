import request from '@/utils/request'

export function apiGetBlogList() {
    return request({
        url: '/getBlogList',
        method: 'get'
    })
}