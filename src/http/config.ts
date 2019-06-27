import Vue from 'vue'

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
    expiredHandler: function () {
      const auth = Vue.prototype.$auth as any
      if (auth) {
        auth.invalidate()
      } else {
        console.warn('登录失效')
      }
    }
  }
}
