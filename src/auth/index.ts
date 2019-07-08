import Vue from 'vue'
import config from './config'
import { deepOverwrite } from '@/util'
import { confirm } from '@/ui'

export interface Authority {
  pid: string
  [name: string]: any
}

export interface Role {
  code: string
  [key: string]: any
}

export interface Principle {
  roles: Role[]

  authorities: Authority[]

  username: string

  [key: string]: any
}

export interface AuthOptions<T> {
  [key: string]: any
}

export default class Auth<U extends Principle> {
  static install<T extends Principle> (_Vue: typeof Vue, options: AuthOptions<T>) {
    _Vue.prototype.$auth = new Auth<T>(options)
  }

  constructor (options: any) {
    this.config = deepOverwrite(config(), options || {})
  }

  config: any = null

  vm: any = new Vue({
    data: {
      principle: null,
      token: '',
      redirectUrl: null
    }
  })

  _lastPrinciple: Principle | null = null

  // 正在处理失效操作标志
  private handlingInvalidate = false

  // 认证实体
  public get principle (): U | null{
    return this.vm.principle
  }

  public set principle (principle: U | null) {
    this._lastPrinciple = this.vm.principle
    this.vm.principle = principle
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

  // Authenticated
  public get authenticated () {
    return !!this.principle
  }

  // 用户名
  public get username (): string | null {
    return this.principle && this.principle.username
  }

  // 失效
  public invalidate () {
    if (this.handlingInvalidate) return
    const loginPage = this.config.loginPage
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
  }

  // 访问控制
  public access (pid: string): Promise<any> {
    let self = this
    let principle = this.principle
    if (!principle) {
      this.loadPrinciple().then(() => {
        return handle()
      })
    }
    return handle()

    function handle () {
      const authorities = (self.principle && self.principle.authorities) || []
      let ret = authorities.some(v => v.pid === pid)
      if (ret) return Promise.resolve()
      return Promise.reject(new Error('access deny'))
    }
  }

  public hasRole (...roles: string[]) {
    let roleList = ((this.principle && this.principle.roles) || []).map(v => v.code)
    return roleList.some(v => roles.includes(v))
  }

  private clear (): void {
    this.principle = null
    this.token = ''
    this.vm.redirectUrl = null
  }

  public login (req: any) {
    const self = this
    return this.config.login(req).then((data: any) => {
      if (this.config.token.enabled) {
        let { token } = data
        if (!token) throw new Error('token required')
        this.token = token
      }
      return this.loadPrinciple()
    }).then(() => {
      let redirectUrl = this.vm.redirectUrl
      this.vm.redirectUrl = null
      if (redirectUrl && !isSamePrinciple()) {
        redirect(redirectUrl)
      } else {
        redirect(this.config.successPage)
      }
      return { redirectUrl }
    })

    function isSamePrinciple () {
      return self._lastPrinciple && !self._lastPrinciple.username &&
      self._lastPrinciple.username === (self.principle && self.principle.username)
    }
  }

  public logout () {
    return this.config.logout().then(() => {
      this.clear()
    })
  }

  public loadPrinciple (): Promise<Principle> {
    let all = [this.config.loadPrinciple()]
    return Promise.all(all).then(([principle]) => {
      this.principle = principle
      return Promise.resolve(this.principle) as Promise<Principle>
    })
  }
}

function redirect (path: string) {
  window.location.hash = `#${path}`
}

function getCurrentPath () {
  return window.location.hash.substr(1)
}
