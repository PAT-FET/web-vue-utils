import Vue from 'vue'
import defaultConfig from './config'
import { deepOverwrite } from '@/util'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosInterceptorManager, AxiosResponse } from 'axios'
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
  private _inst: AxiosInstance

  constructor (options: any) {
    this._inst = getInst(options)
  }

  static install (_Vue: typeof Vue, options: any) {
    _Vue.prototype.$http = new Http(options)
  }

  getUri (config?: AxiosRequestConfig): string {
    return this._inst.getUri(config)
  }
  request<T = any> (config: AxiosRequestConfig): Promise<T> {
    return this._inst.request(config)
  }
  get<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    return this._inst.get(url, config)
  }
  delete<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    return this._inst.delete(url, config)
  }
  head<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.head(url, config)
  }
  post<T = any> (url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this._inst.post(url, data, config)
  }
  put<T = any> (url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this._inst.put(url, data, config)
  }
  patch<T = any> (url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this._inst.patch(url, data, config)
  }
}
