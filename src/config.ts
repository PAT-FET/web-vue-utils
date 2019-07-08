import Vue from 'vue'

export default {
  ui: {
    confirm: function (title: string, content: string): Promise<any> {
      const vua = Vue.prototype.$vua as any
      if (vua) {
        return vua.$modal.confirm({ title, content }) as Promise<any>
      }
      let ret = window.confirm(content)
      return ret ? Promise.resolve() : Promise.reject(new Error('cancel'))
    },
    message: function (text: string) {
      const vua = Vue.prototype.$vua as any
      if (vua) {
        vua.$message.error(text)
      } else {
        alert(text)
      }
    }
  }
}
