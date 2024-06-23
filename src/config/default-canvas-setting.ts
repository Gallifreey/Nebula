import type { CanvasSetting } from '~@/stores/canvas'
import { ECanvasEnum, EMouseStateEnum } from '~@/types/canvas'

export const defaultCanvasSetting: CanvasSetting = {
  canvas: {
    action: ECanvasEnum.IDLE,
    mouse: {
      state: EMouseStateEnum.DOWN,
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
