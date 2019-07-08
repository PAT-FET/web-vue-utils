import Vue from 'vue'
import { Principle } from './index'

export default function config () {
  return {
    token: {
      enabled: true,
      key: 'X-Token',
      storage: {
        get: function () {
          return window.localStorage['X-Token']
        },
        set: function (token: string) {
          window.localStorage['X-Token'] = token
        }
      }
    },
    loginPage: '/login',
    successPage: '/',
    // deniedPage: '/error/403',
    urls: {
      login: '/login',
      logout: '/logout',
      loadPrinciple: '/principle'
    },
    login: function (req: any): Promise<{token: string}> {
      let http = Vue.prototype.$http as any
      if (http) {
        return http.post(this.urls.login, req)
      }
      throw new Error('not implemented')
    },
    logout: function (): Promise<any> {
      let http = Vue.prototype.$http as any
      if (http) {
        return http.delete(this.urls.logout)
      }
      throw new Error('not implemented')
    },
    loadPrinciple: function <T extends Principle> (): Promise<T> {
      let http = Vue.prototype.$http as any
      if (http) {
        return http.get(this.urls.loadPrinciple)
      }
      throw new Error('not implemented')
    }
  }
}
