import { defaultCanvasSetting } from '~@/config/default-canvas-setting'
import type { ECanvasEnum, EMouseStateEnum } from '~@/enums/canvas-enum'

export interface PointType {
  x: number
  y: number
}

export interface BBOX extends PointType {
  height: number
  width: number
}

export interface EntryType {
  id: number
  type: number
  x: number
  y: number
  rotate: number
  scale: number
  height: number
  width: number
  display: boolean
  client: PointType
  realBBOX: BBOX
}

export interface CanvasMouse {
  state: EMouseStateEnum
  cursor: PointType
  before: PointType
  after: PointType
}
export interface CanvasSetting {
  canvas: {
    action: ECanvasEnum
    mouse: CanvasMouse
  }
  templateEntry?: {
    info: EntryType
    index: number
  }
  entries: EntryType[]
}

export const useCanvasStore = defineStore('canvas', () => {
  const canvasSetting = reactive<CanvasSetting>(defaultCanvasSetting)
  function setCanvasMouse(mouse: CanvasMouse) {
    canvasSetting.canvas.mouse = mouse
  }
  function setCanvasMouseDown(before: PointType) {
    canvasSetting.canvas.mouse.before = before
  }
  function setCanvasMouseUp(after: PointType) {
    canvasSetting.canvas.mouse.after = after
  }
  function setCanvasTemplateEntry(entry: EntryType, index: number) {
    canvasSetting.templateEntry = {
      info: entry,
      index,
    }
  }
  return {
    canvasSetting,
    setCanvasMouse,
    setCanvasMouseDown,
    setCanvasMouseUp,
    setCanvasTemplateEntry,
  }
})
