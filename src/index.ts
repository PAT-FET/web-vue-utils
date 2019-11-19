import Auth from './auth'
import Http from './http'
import Storage from './storage'
import Ws from './ws'
import defaultConfig from './config'
import { deepOverwrite } from './util'
import './vue'

export * from './auth'
export * from './http'
export * from './storage'
export * from './ws'

export {
  Auth,
  Http,
  Storage,
  Ws
}

export default {
  config: function (options: any) {
    return deepOverwrite(defaultConfig, options || {})
  }
}
