import Vue from 'vue'
import config from './config'
import { deepOverwrite } from '@/util'

type a = typeof config

export interface Authority {
  pid: string
  [name: string]: any
}

export default class Auth<U>{
  static install (_Vue: typeof Vue, options: any) {
    _Vue.prototype.$auth = new Auth(options)
  }

  constructor (options: any) {
    this.config = deepOverwrite(config(), options || {})
  }

  config: any = null

  vm: any = new Vue({
    data: {
      auth: null,
      token: '',
      authorities: [],
      cachedUrl: ''
    }
  })

  // 认证失败钩子
  public authFailureHandler () {
    let path =
  }

  // 认证实体
  public get auth (): U | null{
    return this.vm.auth
  }

  public set auth (auth: U | null) {
    this.vm.auth = auth
  }

  // token
  public get token (): string {
    let {enabled, storage}: any = this.config.token || {}
    if (!enabled) return ''
    let t = this.vm.token
    if (!t && storage) {
      t = storage.get()
      if (t) this.vm.token = t
    }
    return t
  }

  public set token (token: string) {
    let {enabled, storage}: any = this.config.token || {}
    if (!enabled) return
    this.vm.token = token
    if (storage) storage.set(token)
  }

  // 用户名
  public get username (): string {
    let { userId } = this.config
    return (this.auth as any)[userId]
  }

  // 权限
  public get authorities (): Authority[] {
    return this.vm.authorities
  }

  public set authorities (authorities: Authority[]) {
    this.vm.authorities = this.vm.authorities || []
  }

  // url
  public get url (): string {
    return this.vm.cachedUrl
  }

  // 访问控制
  access (pid: string): boolean {
    return this.authorities.some(v => v.pid === pid)
  }

  public clear (): void {
    this.auth = null
    this.token = ''
    this.authorities = []
  }
}
