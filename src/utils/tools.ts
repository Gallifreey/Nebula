import { get } from 'lodash-es'
import router from '@/router'
import type { PointType } from '~@/types/canvas'

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
