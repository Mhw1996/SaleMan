import axios from 'axios'
import router from './router'
import merge from 'lodash/merge'
import qs from 'qs'
// 创建axios实例；
const http = axios.create({
    timeout: 1000 * 30,
    //允许跨域带token；
    withCredentials: true,
    headers: {'Content-Type': 'application/json; charset=utf-8'}
})
/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    console.dir("czy:"+config.url)
    if(config.url.indexOf("loginDeptUser")>-1){
      console.dir("登录")
    }else {
      if (window.localStorage.getItem('token')) {
        console.dir("其他")
        config.headers['token'] = window.localStorage.getItem('token');
      }
    }
    return config
  }, error => {
    return Promise.reject(error)
})
  
/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    if (response.data && response.data.code === 401) { // 401, token失效
    console.dir("退出登录")
      router.push({ name: 'first' })
    }
    return response
  }, error => {
    return Promise.reject(error)
  })

  export default http