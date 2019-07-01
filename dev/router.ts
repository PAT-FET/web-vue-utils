import Vue from 'vue'
import Router, { NavigationGuard } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Auth from '../src/auth/index'

Vue.use(Router)

let router = new Router({
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
  const auth = Vue.prototype.$auth as Auth<any>
  if(to.fullPath === '/') {
    auth.access('home').then(() => {
      next()
    }).catch(() => {
      next('/login')
    })
    return
  }
  next()
}

router.beforeEach(frontGuard)

export default router
