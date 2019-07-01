import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.scss'
import { Auth, Http } from '@/index'

Vue.config.productionTip = false

Vue.use(Auth)
Vue.use(Http, {
  baseURL: 'https://www.easy-mock.com/mock/5d19fe9f35e5413fe189fec3/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
