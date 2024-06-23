import { get } from 'lodash-es'
import router from '@/router'

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
