import Auth from './auth'
import Http from './http'

declare module 'vue/types/vue' {
    interface Vue {
        $auth: Auth<any>,
        $http: Http
    }
}
