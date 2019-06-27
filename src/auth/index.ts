import Vue from 'vue'
import config from './config'
import { deepOverwrite, confirm } from '@/util'

export interface Authority {
  pid: string
  [name: string]: any
}

export default class Auth<U> {
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
      redirectUrl: null
    }
  })

  // 正在处理失效操作标志
  private handlingInvalidate = false

  // 认证实体
  public get auth (): U | null{
    return this.vm.auth
  }

  public set auth (auth: U | null) {
    this.vm.auth = auth
  }

  // token
  public get token (): string {
    let { enabled, storage }: any = this.config.token || {}
    if (!enabled) return ''
    let t = this.vm.token
    if (!t && storage) {
      t = storage.get()
      if (t) this.vm.token = t
    }
    return t
  }

  public set token (token: string) {
    let { enabled, storage }: any = this.config.token || {}
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

  // 失效
  public invalidate () {
    if (this.handlingInvalidate) return
    const loginPage = '/login'
    let currentPath = getCurrentPath()
    if (currentPath.startsWith(loginPage)) return
    this.handlingInvalidate = true
    this.clear()
    confirm('登陆失效', '是否选择重新登录').then(() => {
      this.vm.redirectUrl = currentPath
      redirect(loginPage)
    }).finally(() => {
      this.handlingInvalidate = false
    })

    function redirect (path: string) {
      window.location.hash = `#${path}`
    }
    function getCurrentPath () {
      return window.location.hash.substr(1)
    }
  }

  // 访问控制
  public access (pid: string): Promise<any> {
    let self = this
    let auth = this.auth
    if (!auth) {
      let all = [this.config.loadAuth()]
      if (this.config.loadAuthorities) all.push(this.config.loadAuthorities())
      return Promise.all(all).then(([auth, authorities]) => {
        this.auth = auth
        this.authorities = authorities || []
        return handle()
      })
    }
    return handle()

    function handle () {
      let ret = self.authorities.some(v => v.pid === pid)
      if (ret) return Promise.resolve()
      return Promise.reject(new Error('access deny'))
    }
  }

  private clear (): void {
    this.auth = null
    this.token = ''
    this.authorities = []
    this.vm.redirectUrl = null
  }

  public login (req: any) {
    return this.config.login(req).then((data: any) => {
      if (this.config.token.enabled) {
        let { token } = data
        if (!token) throw new Error('token required')
        this.token = token
      }
      let redirectUrl = this.vm.redirectUrl
      this.vm.redirectUrl = null
      return { redirectUrl }
    })
  }

  public logout () {
    return this.config.logout().then(() => {
      this.clear()
    })
  }
}
