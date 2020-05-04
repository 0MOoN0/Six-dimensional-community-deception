import request from '@/utils/request-dev'
const group_name = 'article'
const api_name = 'article'
export default{
    findTopArticle(){
        return request({
            url: `/${group_name}/${api_name}/toparticle`,
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
    save(article){
        return request({
            url: `/${group_name}/${api_name}`,
            method: 'post',
            data: article            
        })
    },
    findById(articleid){
        return request({
            url: `/${group_name}/${api_name}/${articleid}`,
            method: 'get'
        })      
    }
}