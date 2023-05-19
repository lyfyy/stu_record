import axios, { Method } from 'axios'
import { ElMessage } from 'element-plus'

console.log('当前主机名：', window.location.host)
console.log('当前端口号：', window.location.port)

const DEV_RGE = /(127.0.0.1|localhost)/g
axios.defaults.baseURL = DEV_RGE.test(window.location.host) ? 'http://localhost:3000/' : window.location.origin + '/'
// : 'https://pm.frostchina.com:9082/api/'

export const baseURL = axios.defaults.baseURL

axios.defaults.timeout = 1000 * 300

axios.interceptors.request.use(
  config => {
    (config as any).headers.Authorization = 'Bearer '
    return config
  },
  err => Promise.reject(err)
)

axios.interceptors.response.use(
  res => res,
  error => Promise.reject(error)
)

/*
 *  保持线程同步，是一个关键问题
 *  processInLogin  登录开关，如果发现401，则开启登录，设置这个变量为true，
 *                  所有因403返回的问题，全部阻断
 *  waitForLogin    所有阻断的请求，当完成登录之后再次重新启动
 *                  {f:回调函数,a:参数,t:异步结果回调}
 */

interface Data {
  [x: string]: unknown
}

// 定义detachEvent 与attachEvent
declare global {
  interface Window {
    detachEvent: any
    attachEvent: any
    cancelRequest: any
  }
}
window.cancelRequest = window.cancelRequest || {}
window.attachEvent = window.attachEvent || {}
window.detachEvent = window.detachEvent || {}

type data = Data | null

const CancelToken = axios.CancelToken
// 通用异步调用
function CommonAjax (data: data, url: string, method: Method) {
  data = method.toLocaleLowerCase() === 'get' ? { params: data } : { data }
  const params = {
    method: method,
    url: url,
    ...data,
    cancelToken: new CancelToken(function executor (c) {
      // An executor function receives a cancel function as a parameter
      window.cancelRequest = c
    })
  }
  return new Promise((resolve, reject) => {
    axios(params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        if (err.message === 'Network Error') {
          console.error('网络异常，请检查网络连接')
          reject(Object.assign(err, { message: '网络异常，请检查网络连接' }))
        }
        if (typeof err.response !== 'undefined' && typeof err.response.status !== 'undefined') {
          const code = err.response.status
          switch (code) {
            case 500:
              console.error('===========服务器罢工============')
              ElMessage.error(err?.response?.data?.msg || err?.response?.data?.message)
              console.error(`data:${JSON.stringify(data)}, url:${url}, method:${method}`)
              break
            default: {
              const msg: string =
                err.response.data && err.response.data.msg
                  ? Array.isArray(err.response.data.msg)
                    ? err.response.data.msg[0]
                    : err.response.data.msg
                  : '未预料的异常'
              ElMessage.error(msg)
              console.error(`${code} 未做错误代码的捕获的后端端异常`)
              break
            }
          }
          if (code !== 401) {
            reject(err) // 只有凭证失效才阻塞ajax跳出
          }
        }
      })
  })
}

export function ajax (data: Data | null, url: string, method: Method = 'GET'): Promise<any> {
  return new Promise((resolve, reject) => {
    CommonAjax(data, url, method)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
