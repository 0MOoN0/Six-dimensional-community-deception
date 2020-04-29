import request from '@/utils/request-dev'
const group_name = 'qa'
const problem_api = 'problem'
const reply_api = 'reply'
export default {
    list(type, page, size) {
        return request({
            url: `/${group_name}/${problem_api}/${type}/${page}/${size}`,
            method: 'get'
        })
    },
    search(page, size, searchMap) {
        return request({
            url: `/${group_name}/${problem_api}/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        })
    },
    orderSearch(page, size, labelId, keyword){
        return request({
            url: `/${group_name}/${problem_api}/ordersearch/${labelId}/${page}/${size}`,
            method: 'post',
            data: keyword
        })
    },
    getLabelsByProblemId(problemId){
        return request({
            url: `/${group_name}/${problem_api}/label/problemid/${problemId}`,
            method: 'get'
        })
    },
    findProblemById(problemId){
        return request({
            url: `/${group_name}/${problem_api}/${problemId}`,
            method: 'get'
        })
    },
    save(problem){
        return request({
            url:`/${group_name}/${problem_api}`,
            method: 'post',
            data: problem
        })
    },
    thumbup(problemid, thumbup){
        return request({
            url: `/${group_name}/${problem_api}/thumbup/${problemid}/${thumbup}`,
            method: 'put'
        })
    }
}