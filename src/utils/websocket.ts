export interface WebSocketOptions {
  url: string
  protocols?: string | string[]
  reconnectTimeout?: number
}

export default class WebSocketService {
  private websocket: WebSocket | null = null
  private callbacks: { [key: string]: Function[] } = {}
  private reconnectTimeout: number = 1000

  constructor(private options: WebSocketOptions) {
    this.open()
  }

  public open(): void {
    this.websocket = new WebSocket(this.options.url, this.options.protocols)
    this.websocket.addEventListener('open', this.handleOpen)
    this.websocket.addEventListener('message', this.handleMessage)
    this.websocket.addEventListener('error', this.handleError)
    this.websocket.addEventListener('close', this.handleClose)
  }

  public close(isActiveClose = false): void {
    if (this.websocket) {
      this.websocket.close()
      if (!isActiveClose)
        setTimeout(() => this.reconnect(), this.reconnectTimeout)
    }
  }

  public reconnect(): void {
    this.open()
  }

  public on(event: 'message', callback: (data: any) => void): void
  public on(event: 'open' | 'error' | 'close', callback: () => void): void
  public on(event: string, callback: (...args: any[]) => void): void {
    if (!this.callbacks[event])
      this.callbacks[event] = []

    this.callbacks[event].push(callback)
  }

  private handleOpen = (): void => {
    if (this.callbacks.open)
      this.callbacks.open.forEach(cb => cb())
  }

  private handleMessage = (event: MessageEvent): void => {
    const data = JSON.parse(event.data)
    if (this.callbacks.message)
      this.callbacks.message.forEach(cb => cb(data))
  }

  private handleError = (error: Event): void => {
    console.error('WebSocket ERROR:', error)
    if (this.callbacks.error)
      this.callbacks.error.forEach(cb => cb(error))
  }

  private handleClose = (): void => {
    if (this.callbacks.close) {
      this.callbacks.close.forEach(cb => cb())
      if (!this.options.reconnectTimeout)
        this.reconnect()
    }
  }

  public send(data: any): void {
    console.log(this.websocket)
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN)
      this.websocket.send(JSON.stringify(data))
    else
      console.warn('尝试发送消息时WebSocket未连接')
  }
}
