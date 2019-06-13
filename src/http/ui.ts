import Vue from 'vue'

export function message (text: string): void {
  const vua = Vue.prototype.$vua as any
  if (vua) {
    vua.$message.error(text)
  } else {
    alert(text)
  }
}

export function confirm (title: string, content: string): Promise<any> {
  const vua = Vue.prototype.$vua as any
  if (vua) {
    return vua.$modal.confirm({ title, content }) as Promise<any>
  }
  return Promise.resolve()
}
