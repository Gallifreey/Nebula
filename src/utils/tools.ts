import { get } from 'lodash-es'
import type { SelectProps } from 'ant-design-vue'
import router from '@/router'
import type { PointType } from '~@/types/canvas'
import type { ChartData, PieData, RawChartData } from '~@/types/structure'

export function getQueryParam(param: string | string[], defaultVal = '') {
  const query = router.currentRoute.value?.query ?? {}
  const val = get(query, param) ?? defaultVal
  return decodeURIComponent(val)
}

export function generateUUID() {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

export function debounce(fn: Function, delay = 500) {
  let timer: any | null = null
  return (...args: any[]) => {
    if (timer)
      clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export function generatePointString(points: PointType[]) {
  let str = ''
  points.forEach((point: PointType) => {
    str += `${point.x}, ${point.y} `
  })
  return str
}

export function generateBBoxByLR(topLeft: PointType, bottomRight: PointType) {
  const w = bottomRight.x - topLeft.x
  const h = bottomRight.y - topLeft.y
  return [
    topLeft,
    {
      x: topLeft.x + w,
      y: topLeft.y,
    },
    bottomRight,
    {
      x: topLeft.x,
      y: topLeft.y + h,
    },
  ]
}

export function hexToRgba(hex: string, opacity: number) {
  return `rgba(${Number.parseInt(`0x${hex.slice(1, 3)}`)},${Number.parseInt(`0x${hex.slice(3, 5)}`)},${
           Number.parseInt(`0x${hex.slice(5, 7)}`)},${opacity})`
}

export function fullWindow(dom: string) {
  const maxViewDom: any = document.getElementById(dom)
  if (maxViewDom.requestFullscreen)
    maxViewDom.requestFullscreen()

  else if (maxViewDom.msRequestFullscreen)
    maxViewDom.msRequestFullscreen()

  else if (maxViewDom.mozRequestFullScreen)
    maxViewDom.mozRequestFullScreen()

  else if (maxViewDom.webkitRequestFullScreen)
    maxViewDom.webkitRequestFullScreen()
}

export function findLabelByValue(data: any, value: number) {
  for (const option of data) {
    if (option.value === value)
      return option.label
    if (option.children) {
      for (const child of option.children) {
        if (child.value === value)
          return child.label
      }
    }
  }
  return null
}

export function useVModel(props: any, propName: string, emits: any, func = () => {}) {
  const show = computed({
    get() {
      return props[propName]
    },
    set(value) {
      emits(`update:${propName}`, value)
      func()
    },
  })
  return show
}

export function generateAntdSelectValues(values: any[], labels: string[]) {
  if (values.length !== labels.length)
    throw new Error('Length of values must be equal to labels')
  const options: SelectProps['options'] = []
  for (let i = 0; i < values.length; i++) {
    options.push({
      value: values[i],
      label: labels[i],
    })
  }
  return options
}

export function generateArrayFromObjArrays<O, K extends keyof O>(obj: O[], key: K) {
  const arr: O[K][] = []
  obj.forEach((o: O) => {
    arr.push(o[key])
  })
  return arr
}

export function getValueFromObjArrays<O, K extends keyof O>(obj: O[] | undefined | null, key1: K, key2: K, value: O[K]) {
  if (obj === undefined || obj === null)
    return null
  let res = null
  for (const o of obj) {
    if (o[key1] === value) {
      res = o[key2]
      break
    }
  }
  return res
}

type KeyboardCallback = (pressedKeys: string) => void

export function listenKeyboardEvents(element: HTMLElement, callback: KeyboardCallback) {
  const pressedKeys: string[] = []

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!pressedKeys.includes(event.key)) {
      pressedKeys.push(event.key)
      callback(pressedKeys.join(''))
    }
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    const index = pressedKeys.indexOf(event.key)
    if (index !== -1) {
      pressedKeys.splice(index, 1)
      callback(pressedKeys.join(''))
    }
  }

  element.addEventListener('keydown', handleKeyDown)
  element.addEventListener('keyup', handleKeyUp)

  // 提供一个函数来移除监听器
  const removeListeners = () => {
    element.removeEventListener('keydown', handleKeyDown)
    element.removeEventListener('keyup', handleKeyUp)
  }

  return removeListeners
}

export function changeChartData2G2PlotData(data: ChartData) {
  const data_ = []
  data_.push({
    label: data.xAxisData[0],
    value: 0,
  })
  for (let i = 1; i < data.xAxisData.length; i++) {
    data_.push({
      label: data.xAxisData[i],
      value: data.seriesData[i - 1],
    })
  }
  return data_
}

export function changePieData2G2PlotData(data: PieData) {
  const data_: RawChartData[] = []
  for (let i = 0; i < data.legendData.length; i++) {
    data_.push({
      label: data.legendData[i],
      value: data.seriesData[i],
    })
  }
  return data_
}
