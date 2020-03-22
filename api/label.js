import request from '@/utils/request-dev'
const group_name = 'base'
const api_name = 'label'
export default {
    toplist() {
        return request({
            url: `/${group_name}/${api_name}/toplist`,
            method: 'get'
        })
    },
    search(page, size, searchMap) {
        return request({
            url: `/${group_name}/${api_name}/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        })
    },
    getList() {
        return request({
            url: `/${group_name}/${api_name}`,
            method: 'get'
        })
    }
}