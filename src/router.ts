import Vue from 'vue'

export function redirect (path: string) {
  // if (Vue.prototype.$router) {
  //   Vue.prototype.$router.push(path)
  // } else {
  //   window.location.hash = `#${path}`
  // }
  window.location.hash = `#${path}`
}

export function getCurrentPath () {
  // if (Vue.prototype.$route) {
  //   return Vue.prototype.$route.path
  // } else {
  //   return window.location.hash.substr(1)
  // }
  return window.location.hash.substr(1)
}
