import request from '@/utils/request-dev'
const group_name = 'qa'
const api_name = 'problem'
export default {
    list(type, page, size) {
        return request({
            url: `/${group_name}/${api_name}/${type}/${page}/${size}`,
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
    orderSearch(page, size, labelId, keyword){
        return request({
            url: `/${group_name}/${api_name}/ordersearch/${labelId}/${page}/${size}`,
            method: 'post',
            data: keyword
        })
    },
    getLabelsByProblemId(problemId){
        return request({
            url: `/${group_name}/${api_name}/label/problemid/${problemId}`,
            method: 'get'
        })
    }
    
}