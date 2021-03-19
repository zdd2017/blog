import request from '@/utils/request'

export function apiSetting(name, data) {
    return request({
        url: '/setting',
        method: 'post',
        params: {
            name: name
        },
        data
    })
}

export function apiUpload(data) {
    return request({
        url: '/upload',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}