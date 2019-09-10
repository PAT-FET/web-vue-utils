import { Component, Vue } from 'vue-property-decorator'

export interface WsOption {
    url: string,
    reconnectTimes?: number
    reconnectInterval?: number // s
}

@Component
export default class Ws extends Vue {
  static install (_Vue: typeof Vue, options: WsOption) {
    const ws = new Ws()
    let { url, reconnectTimes, reconnectInterval }: any = options || {}
    if (url) ws.url = url
    if (reconnectTimes || reconnectTimes === 0) ws.reconnectTimes = reconnectTimes
    if (reconnectInterval || reconnectInterval === 0) ws.reconnectInterval = reconnectInterval
    _Vue.prototype.$ws = ws
  }

    url: string = ''

    reconnectTimes: number = 30

    reconnectInterval: number = 10

    ws: WebSocket | null = null

    private reconnecting: boolean = false

    connect () {
      if (!this.url) throw new Error('websocket url required')
      if (this.ws && this.ws.readyState === WebSocket.CONNECTING) return
      this.ws = new WebSocket(encodeURI(this.url))
      this.ws.onopen = () => {
        console.log(`websocket [${this.url}] 已连接`)
      }
      this.ws.onmessage = (event) => {
        let data = JSON.parse(event.data)
        let type = data.type
        let payload = data.data
        console.debug(`websocket data: `, data)
        if (type) this.$emit(type, data)
      }
      this.ws.onclose = (event) => {
        console.log(`websocket [${this.url}] 已断开连接`)
      }
      this.ws.onerror = (event) => {
        console.debug(`websocket [${this.url}] 连接错误`, event)
        this.reconnect()
      }
    }

    reconnect () {
      if (this.reconnecting) return
      let times = this.reconnectInterval
      if (times === 0) return
      this.reconnecting = true
      let handler = setInterval(() => {
        times--
        console.debug(`websocket [${this.url}] 重连剩余 ${times} 次`)
        if (times < 1) {
          clearInterval(handler)
          this.reconnecting = false
        }
        this.connect()
      }, this.reconnectInterval * 1000)
    }
}
