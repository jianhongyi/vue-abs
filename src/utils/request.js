import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => response,
  //   response => {
  //     const res = response.data
  //     if (res.code !== 200) {
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtomText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('fedLogOut').then(() => {
  //             location.reload()
  //           })
  //         })
  //       } else {
  //         Message({
  //           message: res.message,
  //           type: 'error',
  //           duration: 5 * 1000
  //         })
  //       }
  //       return Promise.reject('error')
  //     } else {
  //       return res
  //     }
  //   },
  error => {
    console.log(error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
