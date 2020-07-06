import Auth from './auth'
import Http from './http'
import Storage from './storage'
import Ws from './ws'

declare module 'vue/types/vue' {
    interface Vue {
        $auth: Auth<any>
        $http: Http
        $storage: Storage
        $ws: Ws
    }
}
