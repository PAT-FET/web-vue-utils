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
    }
  }
}
