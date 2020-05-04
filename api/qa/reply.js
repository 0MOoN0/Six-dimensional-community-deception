import request from '@/utils/request-dev'
const group_name = 'qa'
const api_name = 'reply'
export default {
    findReplysByProblemId(problemId, page, size) {
        return request({
            url: `/${group_name}/${api_name}/search/${page}/${size}`,
            method: 'post',
            data: problemId
        })
    },
    save(pojo){
        return request({
            url: `/${group_name}/${api_name}`,
            method: 'post',
            data: pojo
        })
    },
    listLabel(){
        return request({
            url: `/${group_name}/${api_name}`,
            method: 'get'
        })
    },
    thumbup(replyid, thumbup){
        return request({
            url: `/${group_name}/${api_name}/thumbup/${replyid}/${thumbup}`,
            method: 'put'
        })
    }
}