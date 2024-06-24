import { defaultCanvasSetting } from '~@/config/default-canvas-setting'
import type { ECanvasEnum, EMouseStateEnum } from '~@/enums/canvas-enum'

export interface PointType {
  x: number
  y: number
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
  return {
    canvasSetting,
    setCanvasMouse,
    setCanvasMouseDown,
    setCanvasMouseUp,
  }
})
