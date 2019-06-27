import Vue from 'vue'

export function deepOverwrite (target: any, source: any) {
  Object.keys(target).forEach(key => {
    let t = target[key]
    let s = source && source[key]
    if (isObject(t)) {
      if (isObject(s)) {
        deepOverwrite(t, s)
      } else if (s !== undefined) {
        target[key] = s
      }
    } else {
      if (s !== undefined) target[key] = s
    }
  })
  return target

  function isObject (obj: any) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }
}

export function confirm (title: string, content: string): Promise<any> {
  const vua = Vue.prototype.vua
  if (vua) {
    return Vue.prototype.$modal.confirm
  }
  return window.confirm(content) ? Promise.resolve() : Promise.reject(new Error('confirm cancel'))
}
