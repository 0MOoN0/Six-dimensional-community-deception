import request from '@/utils/request-dev'
const group_name = 'article'
const api_name = 'channel'
export default{
    findAll(){
        return request({
            url: `/${group_name}/${api_name}`,
            method: 'get'
        })        
    },
    findSearch(searchmap){
        return request({
            url: `/${group_name}/${api_name}/search`,
            method: 'post',
            data: searchmap
        })       
    }
}