import { defaultBufferSetting } from '~@/config/default-buffer-seting'
import type { BufferType } from '~@/types/buffer'
import type { AnnotationType, ImageType, Label } from '~@/types/structure'
import { Node } from '@antv/x6'

interface AnnotationUpdateType {
  classification: {
    name: string
    color: string
    id: number
  }
  detection: {
    x: number
    y: number
    w: number
    h: number
    name: string
    color: string
    id: number
    bid: number
  }
}

export const useBufferStore = defineStore('buffer', () => {
  const setting = reactive<BufferType>(defaultBufferSetting)
  const currentData = ref<AnnotationType>()
  const fakeIndex = ref(-1)
  const selectedEntry = ref<Node>()
  const labels = ref<Label[]>([])
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
      case 'detection':
        for (const cd of currentData.value) {
          if (cd.bid === selectedEntry.value?.data.id) {
            cd.name = args.name
            cd.id = args.id
            cd.color = args.color
          }
        }
        break
    }
  }
  return {
    setting,
    currentData,
    fakeIndex,
    selectedEntry,
    labels,
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
