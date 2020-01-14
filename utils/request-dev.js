import axios from 'axios'
import {getUser} from '@/utils/auth'
// 创建axios实例
const service = axios.create({
    baseURL: 'http://114.116.229.187:7300/mock/5e15ce0f3997fb00165a9752', // api的base_url
    timeout: 30000, // 请求超时时间
    headers: { 'Authorization': 'Bearer '+getUser().token  }// 带上请求头
  })
export default service