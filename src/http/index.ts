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

export default class Http {
  static install (_Vue: typeof Vue, options: any) {
    _Vue.prototype.$http = getInst(options)
  }
}
