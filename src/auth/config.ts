import Vue from 'vue'

export default function config () {
  return {
    userId: 'username',
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
    urls: {
      login: '/login',
      logout: '/logout',
      loadAuth: '/users',
      loadAuthorities: '/resources'
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
        return http.post(this.urls.logout)
      }
      throw new Error('not implemented')
    },
    loadAuth: function (): Promise<any> {
      let http = Vue.prototype.$http as any
      if (http) {
        return http.get(this.urls.loadAuth)
      }
      throw new Error('not implemented')
    },
    loadAuthorities: function (): Promise<any> {
      let http = Vue.prototype.$http as any
      if (http) {
        return http.post(this.urls.loadAuthorities)
      }
      throw new Error('not implemented')
    }
  }
}
