import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import Vue from 'vue'
import transformFn from './transform'
import { message, confirm } from '@/ui'

export default function (config: any) {
  const transform = transformFn(config)
  return {
    req: function req (config: AxiosRequestConfig): any {
      // add timestamp, prevent IE cache
      if (config.method === 'get') config.url = timestampUrl(config.url || '')
      // token auth
      let auth = Vue.prototype.$auth
      if (auth && auth.config.token && auth.config.token.enabled) {
        config.headers[auth.config.token.key] = auth.token
      }
      return config

      function timestampUrl (url: string) {
        if (url.indexOf('?') === -1) return url + '?_t=' + Date.now()
        return url + '&_t=' + Date.now()
      }
    },
    reqErr: function reqErr (err: any): any {
      return Promise.reject(err) // do nothing
    },
    res: function res (response: AxiosResponse): any {
      if (response.status === 200) {
        return transform(response).catch((e: any) => {
          if (e && e.status === 401) {
            handleTokenExpired()
          } else {
            message(e.message)
          }
          return Promise.reject(e.payload)
        })
      } else {
        message(response.statusText)
        return Promise.reject(response.statusText)
      }
    },
    resErr: function resErr (err: AxiosError): any {
      let res = err && err.response
      if (!res) {
        message(err && err.message)
      } else if (res.status === 401) {
        handleTokenExpired()
      } else {
        message(res.statusText || 'Unknown Error')
      }
      return Promise.reject(err)
    }
  }

  function handleTokenExpired () {
    if (config.expiredHandler) config.expiredHandler()
  }
}
