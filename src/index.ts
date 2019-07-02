import Auth from './auth'
import Http from './http'
import defaultConfig from './config'
import { deepOverwrite } from './util'
import Vue from 'vue'

export {
  Auth,
  Http
}

export default {
  config: function (options: any) {
    return deepOverwrite(defaultConfig, options || {})
  }
}
