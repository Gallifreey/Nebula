import type { CanvasSetting } from '~@/stores/canvas'
import { ECanvasEnum, EMouseStateEnum } from '~@/enums/canvas-enum'

export const defaultCanvasSetting: CanvasSetting = {
  canvas: {
    action: ECanvasEnum.IDLE,
    mouse: {
      state: EMouseStateEnum.IDLE,
      cursor: {
        x: 0,
        y: 0,
      },
      before: {
        x: 0,
        y: 0,
      },
      after: {
        x: 0,
        y: 0,
      },
    },
  },
}
