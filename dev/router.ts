import Vue from 'vue'
import Router, { NavigationGuard } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})


const frontGuard: NavigationGuard = function (to, from, next)  {
  // if(to.fullPath === '/' && )
  next()
}
