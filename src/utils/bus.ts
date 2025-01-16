interface BusClass {
  emit: (name: string) => void
  on: (name: string, callback: Function) => void
}

type PramsKey = string | number | symbol

interface List {
  [key: PramsKey]: Array<Function>
}
class Bus implements BusClass {
  list: List
  constructor() {
    this.list = {}
  }

  emit(name: string, ...args: Array<any>) {
    const evnentName: Array<Function> = this.list[name]
    evnentName.forEach((fn) => {
      fn.apply(this, args)
    })
  }

  on(name: string, callback: Function) {
    const fn: Array<Function> = this.list[name] || []
    fn.push(callback)
    this.list[name] = fn
  }
}

export default new Bus()
