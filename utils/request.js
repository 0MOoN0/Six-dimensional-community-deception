import axios from 'axios'
// 创建axios实例
const service = axios.create({
  // baseURL: 'http://localhost:7300/mock/5e15ce0f3997fb00165a9752', // api的base_url
  baseURL: 'http://localhost:9012', // api的base_url
  timeout: 30000 // 请求超时时间
})
export default service