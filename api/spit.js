import request from '@/utils/request-dev'
const group_name = 'spit'
const api_name = 'spit'
export default {
  isThumbuped(id) {
    return request({
      url: `/${group_name}/${api_name}/thumbup/${id}`,
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
  findById(id) {
    return request({
      url: `/${group_name}/${api_name}/${id}`,
      method: 'get'
    })
  },
  commentlist(id, page, size) {
    return request({
      url: `/${group_name}/${api_name}/commentlist/${id}/${page}/${size}`,
      method: 'get'
    })
  },
  thumbup(id) {
    return request({
      url: `/${group_name}/${api_name}/thumbup/${id}`,
      method: 'put'
    })
  },
  save(pojo) {
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'post',
      data: pojo
    })
  }
}
