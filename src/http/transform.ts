import { AxiosResponse } from 'axios'

class TransError {
  status: number| null
  message: string
  payload: any

  constructor (status: number| null, message: string, payload: any) {
    this.status = status
    this.payload = payload
    this.message = message
  }
}

export default function (config: any) {
  const map = config.map
  return function transform (response: AxiosResponse): Promise<any> {
    if (response.status !== 200) return Promise.reject(response) // only care status 200
    let status = null
    if (Object.prototype.toString.call(response.data) !== '[object Object]') return Promise.resolve(response.data)
    if (response.data[map.code] === map.successCode) return Promise.resolve(response.data[map.data])
    if (response.data[map.code] === map.expiredCode) status = 401
    let msg = response.data[map.msg] || response.data[map.data] || response.data[map.code]
    return Promise.reject(new TransError(status, msg, response.data[map.data]))
  }
}
