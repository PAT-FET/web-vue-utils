import Vue from 'vue'
import { message } from '@/ui'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export default function config () {
  return {
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    timeout: 30 * 1000,
    map: {
      code: 'resultCode',
      msg: 'resultMesg',
      data: 'data',
      successCode: '000000',
      expiredCode: '010104'
    },
    request: (cfg: AxiosRequestConfig) => {},
    response: (response: AxiosResponse) => {},
    timestamp: true,
    expiredHandler: function (data: any) {
      const auth = Vue.prototype.$auth as any
      if (auth) {
        auth.invalidate()
      } else {
        message('登录失效')
      }
    }
  }
}
