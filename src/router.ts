import config from './config'

export function redirect (path: string) {
  const router: any = config.router
  if (router) {
    router.push(path)
  } else {
    window.location.hash = `#${path}`
    window.location.reload()
  }
}

export function getCurrentPath () {
  const router: any = config.router
  if (router) {
    return router.currentRoute.path
  } else {
    return window.location.hash.substr(1)
  }
}
