/**
 * axios全局配置
 * TODO: 拦截器全局配置，根据实际情况修改
 */
import axios from 'axios'
import store from '../store'
import router from '../router'
import { Message } from 'element-ui'
import Auth from '@/util/auth'
import { stringify } from 'querystring'

var getTokenLock = false,
  CancelToken = axios.CancelToken,
  requestList = []

/**
 * Token校验
 * @param {function} cancel - 中断函数
 * @param {function} callback -  回调
 * @description 校验Token是否过期，如果Token过期则根据配置采用不同方法获取新Token
 *              自动获取Token：过期时自动调用获取Token接口。注意：当有任一请求在获取Token时，其余请求将顺延，直至新Token获取完毕
 *              跳转授权Token：过期时中断当前所有请求并跳转到对应页面获取Token。注意：跳转页面授权最佳实现应在授权页面点击触发
 */
function checkToken(callback) {
  if (!Auth.hasToken()) {
    // 自动获取Token
    if (Auth.tokenTimeoutMethod == 'refreshToken') {
      // 如果当前有请求正在获取Token
      store.dispatch('auth/refreshToken').then(() => {
        console.log('已获取新token')
        callback()
      })
    } else if (Auth.tokenTimeoutMethod == 'jumpAuthPage') {
      // 跳转授权Token
      if (router.currentRoute.path != '/auth') {
        router.push('/auth')
      }
    }
  } else {
    callback()
  }
}

/**
 * 阻止短时间内的重复请求
 * @param {string} url - 当前请求地址
 * @param {function} c - 中断请求函数
 * @description 每个请求发起前先判断当前请求是否存在于RequestList中，
 *              如果存在则取消该次请求，如果不存在则加入RequestList中，
 *              当请求完成后500ms时，清除RequestList中对应的该请求。
 */
function stopRepeatRequest(url, c) {
  for (let i = 0; i < requestList.length; i++) {
    if (requestList[i] == url) {
      c()
      return
    }
  }
  requestList.push(url)
}

// 超时设置
const service = axios.create({
  // 请求超时时间
  baseURL: '/ymw',
  timeout: 500000,
})

// axios.defaults.headers.post['Content-Type'] = 'application/json';
// // baseURL
axios.defaults.baseURL = 'http://192.168.1.128:8080/';

// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为token
service.interceptors.request.use(
  config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    let cancel
    config.cancelToken = new CancelToken(function executor(c) {
      cancel = c
    })
    // if(config.method =="post"){
    //   config.data = Json.stringify(config.data)
    // }
    // if (config.method === 'post') {
    //     config.data = qs.stringify({
    //       ...config.data
    //     })
    // }
    // console.log("in axios")
    checkToken(function() {
      //config.headers.Authorization = `${store.state.user.token}`
      config.headers.authKey = store.state.auth.token
    })
    //stopRepeatRequest(config.url, cancel)
    return config
  },
  err => {
    console.log(err)
    return Promise.reject(err)
  }
)

// http response 拦截器
// 针对响应代码确认跳转到对应页面
service.interceptors.response.use(
  response => {
    // for( let i = 0; i < requestList.length; i++){
    //     if(requestList[i] == response.config.url){
    //         // 注意，不能保证500ms必定执行，详情请了解JS的异步机制
    //         setTimeout(function(){
    //             requestList.splice(i,1)
    //         }, 500)
    //         break
    //     }
    // }
    return Promise.resolve(response.data)
  },
  error => {
    if (axios.isCancel(error)) {
      console.log(error)
      return Promise.reject('Ajax Abort: 该请求在axios拦截器中被中断')
    } else if (error.response) {
      let ret = JSON.stringify(error.response)
      switch (error.response.status) {
        case 401:
          // router.push('/401')
        case 403:
          // router.push('/403')
		case 404:
		  // router.push('/404')
		case 500:
		  // router.push('/500')
        default:
          console.log(ret)
		  // router.push('/login')
          Message({
            message: `错误代码：${error.response.status}`,
            type: 'error'
          })
      }
      return Promise.reject(error.response.data)
    }
  }
)

export default service
