### 概述

`Http` - http请求插件， 基于axios封装，用于支持json响应数据：
- 全局异常处理
- 失效处理 - 默认调用 `auth` 插件的`invalidate`方法
- get 请求时间戳
- token 支持 - 需要在 `auth` 插件中开启


### 默认配置

```js
{
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    timeout: 30 * 1000,
    map: {
      code: 'resultCode',
      msg: 'resultMesg',
      data: 'data',
      successCode: '000000',
      expiredCode: '010104'
    },
    request: (cfg: AxiosRequestConfig) => {},
    response: (response: AxiosResponse) => {},
    timestamp: true,
    expiredHandler: function (data: any) {
      const auth = Vue.prototype.$auth as any
      if (auth) {
        auth.invalidate()
      } else {
        message('登录失效')
      }
    }
  }

```

### API

参考 `axios`
