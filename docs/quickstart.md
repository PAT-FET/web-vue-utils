### Vue插件

工具大多以vue插件的形式提供

```js
import Vue from 'vue'
import { Auth, Http } from '@pat-fet/web-vue-utils'

Vue.use(Auth)
Vue.use(Http, {
  baseURL: 'https://www.easy-mock.com/mock/5d19fe9f35e5413fe189fec3/api'
})
```


### 全局配置

```js
import wvu from '@pat-fet/web-vue-utils'

wvu.config({
    ui: {
        ...
    }
})
```

默认全局配置

``` js
{
  ui: {
    confirm: function (title: string, content: string): Promise<any> {
      const vua = Vue.prototype.$vua as any
      if (vua) {
        return vua.$modal.confirm({ title, content }) as Promise<any>
      }
      let ret = window.confirm(content)
      return ret ? Promise.resolve() : Promise.reject()
    },
    message: function (text: string) {
      const vua = Vue.prototype.$vua as any
      if (vua) {
        vua.$message.error(text)
      } else {
        alert(text)
      }
    }
  },
  router: null, // 请指定路由，使用原生尚有bug
}
```

如果提供`vua`将使用`vua`的ui，否则使用原生的