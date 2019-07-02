import Vue from 'vue'
import config from './config'

export function message (text: string): void {
  if (config.ui && config.ui.message) return (config.ui.message as any)(text)
  const vua = Vue.prototype.$vua as any
  if (vua) {
    vua.$message.error(text)
  } else {
    alert(text)
  }
}

export function confirm (title: string, content: string): Promise<any> {
  if (config.ui && config.ui.confirm) return (config.ui.confirm as any)(title, content)
  const vua = Vue.prototype.$vua as any
  if (vua) {
    return vua.$modal.confirm({ title, content }) as Promise<any>
  }
  return Promise.resolve()
}
