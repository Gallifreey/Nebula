import { url } from 'inspector'
import type { WebSocketOptions } from '~@/utils/websocket'
import WebSocketService from '~@/utils/websocket'

export const useWebSocketStore = defineStore('websocket', () => {
  const map = new Map<string, WebSocket>()
  const wss = reactive<Map<string, WebSocket>>(map)
  function build(key: string, options: WebSocketOptions) {
    const ws = new WebSocket(options.url, options.protocols)
    wss.set(key, ws)
  }
  function open(key: string) {
    return wss.get(key)?.onopen
  }
  function close(key: string) {
    return wss.get(key)?.close
  }
  function send(key: string) {
    return wss.get(key)?.send
  }
  function message(key: string) {
    return wss.get(key)?.onmessage
  }
  function existed(key: string) {
    return wss.has(key)
  }
  return {
    build,
    open,
    close,
    message,
    send,
    existed,
  }
})
