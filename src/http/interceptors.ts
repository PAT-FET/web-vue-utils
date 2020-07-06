import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import Vue from 'vue'
import transformFn from './transform'
import { message, confirm } from '@/ui'

export default function (config: any) {
  const transform = transformFn(config)
  return {
    req: function req (cfg: AxiosRequestConfig): any {
      if (config.request) config.request(cfg)
      // add timestamp, prevent IE cache
      if (cfg.method === 'get' && config.timestamp) cfg.url = timestampUrl(cfg.url || '')
      // token auth
      let auth = Vue.prototype.$auth
      if (auth && auth.config.token && auth.config.token.enabled) {
        cfg.headers[auth.config.token.key] = auth.token
      }
      return cfg

      function timestampUrl (url: string) {
        if (url.indexOf('?') === -1) return url + '?_t=' + Date.now()
        return url + '&_t=' + Date.now()
      }
    },
    reqErr: function reqErr (err: any): any {
      return Promise.reject(err) // do nothing
    },
    res: function res (response: AxiosResponse): any {
      if (config.response) config.response(response)
      if (response.status === 200) {
        return transform(response).catch((e: any) => {
          if (e && e.status === 401) {
            handleTokenExpired(e.payload)
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
        handleTokenExpired(res)
      } else {
        message(res.statusText || 'Unknown Error')
      }
      return Promise.reject(err)
    }
  }

  function handleTokenExpired (data: any) {
    if (config.expiredHandler) config.expiredHandler(data)
  }
}
