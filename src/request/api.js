import axios from 'axios'
import config from './config'
import qs from 'qs'
import router from "../router";

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {},
      transformResponse: [function (data) {

      }]
    })
    instance.interceptors.request.use(
      config => {
        // Tip: 1
        // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画

        // Tip: 2
        // 带上 token , 可以结合 vuex 或者重 localStorage
        // if (store.getters.token) {
        //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
        // } else {
        //     // 重定向到登录页面
        // }

        // Tip: 3
        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method.toLocaleLowerCase === 'post' || config.method.toLocaleLowerCase === 'delete' || config.method.toLocaleLowerCase === 'put') {
          config.data = qs.stringify(config.data)
        }
        return config
      },
      error => {
        // 请求错误时做些事(接口错误、超时等)
        // Tip: 4
        // 关闭loadding
        console.log('request:', error)
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('请求超时了')
        }
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          const errorStatus = errorInfo.status
          router.push({
            path: '/error/${errorStatus}'
          })
        }
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      response => {
        let data
        if (response.data == undefined) {
          data = data.request.responseText
        } else {
          data = response.data
        }
        switch (data.code) {
          case '':
            break;
          default:
        }
        return data
      },
      error => {
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.message = '请求错误'
              break
            case 401:
              error.message = '未授权，请登录'
              break
            case 403:
              error.message = '拒绝访问'
              break
            case 404:
              error.message = '请求地址出错:${error.response.config.url}'
              break
            case 408:
              error.message = '请求超时'
              break
            case 500:
              error.message = '服务器内部错误'
              break
            case 501:
              error.message = '服务未实现'
              break
            case 502:
              error.message = '网关错误'
              break
            case 503:
              error.message = '服务器不可用'
              break
            case 504:
              error.message = '网关超时'
              break
            case 505:
              error.message = 'http版本不支持'
              break
            default:

          }
        }
        console.error(error)
        return Promise.reject(error)
      })
    instance(options).then((res) => {
      resolve(res)
      return false
    }).catch((error) => {
      reject(error)
    })
  })
}
