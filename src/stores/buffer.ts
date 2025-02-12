import { AnyARecord } from 'dns'
import { defaultBufferSetting } from '~@/config/default-buffer-seting'
import type { BufferType } from '~@/types/buffer'
import type { AnnotationType, ImageType } from '~@/types/structure'

interface AnnotationUpdateType {
  classification: {
    name: string
    id: number
  }
  detection: {
    x: number
    y: number
    w: number
    h: number
    name: string
    id: number
  }
}

export const useBufferStore = defineStore('buffer', () => {
  const setting = reactive<BufferType>(defaultBufferSetting)
  const currentData = ref<AnnotationType>()
  function set<K extends keyof BufferType>(key: K, value: BufferType[K]) {
    setting[key] = value
  }
  function get<K extends keyof BufferType>(key: K) {
    return setting[key]
  }
  function initBuffer<T extends AnnotationType>(value: T[]) {
    clearBuffer()
    for (let i = 0; i < value.length; i++)
      pushBackIntoBuffer(value[i])
    setCurrentData(0)
  }
  function pushFrontIntoBuffer<T extends AnnotationType>(value: T) {
    if (setting.annotationBuffer.length > 10)
      setting.annotationBuffer.shift()
    setting.annotationBuffer.unshift(value)
  }
  function pushBackIntoBuffer<T extends AnnotationType>(value: T) {
    if (setting.annotationBuffer.length > 10)
      setting.annotationBuffer.pop()
    setting.annotationBuffer.push(value)
  }
  function clearBuffer() {
    setting.annotationBuffer = []
  }
  function setCurrentData(index: number) {
    currentData.value = setting.annotationBuffer[index]
  }
  function updateBuffer(index: number) {
    setting.annotationBuffer[index] = currentData.value
  }
  function updateCurrentData<T extends ImageType>(index: number, type: T, args: AnnotationUpdateType[T]) {
    switch (type) {
      case 'classification':
        if (currentData.value) {
          currentData.value.name = args.name
          currentData.value.id = args.id
        }
        break
    }
  }
  return {
    setting,
    currentData,
    set,
    get,
    initBuffer,
    clearBuffer,
    pushFrontIntoBuffer,
    pushBackIntoBuffer,
    setCurrentData,
    updateCurrentData,
  }
})
