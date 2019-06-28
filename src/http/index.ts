import Vue from 'vue'
import defaultConfig from './config'
import { deepOverwrite } from '@/util'
import axios, { AxiosInstance } from 'axios'
import interceptorsFn from './interceptors'

function getInst (options: any): AxiosInstance {
  const config = deepOverwrite(defaultConfig(), options || {})
  const http = axios.create({
    baseURL: config.baseURL,
    withCredentials: config.withCredentials,
    timeout: config.timeout
  }) as AxiosInstance

  const { req, res, reqErr, resErr } = interceptorsFn(config)

  http.interceptors.request.use(req, reqErr)
  http.interceptors.response.use(res, resErr)
  return http
}

interface Http extends AxiosInstance {
}

// export default class Http implements AxiosInstance{
//   static install (_Vue: typeof Vue, options: any) {
//     _Vue.prototype.$http = getInst(options)
//   }
// }

const HttpConstructor = function (options: any): Http {
  return getInst(options)
}

HttpConstructor.install = function (_Vue: typeof Vue, options: any) {
  _Vue.prototype.$http = new (HttpConstructor(options) as any)
}

export default HttpConstructor

