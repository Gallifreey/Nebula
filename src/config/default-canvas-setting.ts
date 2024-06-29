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
  entries: [
    {
      id: 0,
      type: 0,
      x: 100,
      y: 100,
      rotate: 0,
      scale: 1,
      height: 200,
      width: 300,
      display: true,
      client: {
        x: 0,
        y: 0,
      },
      realBBOX: {
        x: 100,
        y: 100,
        height: 100,
        width: 100,
      },
    },
  ],
}
