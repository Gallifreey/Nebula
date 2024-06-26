import { ShapeEnum } from '~@/enums/canvas-enum'
import type { PointType } from '~@/types/canvas'

export abstract class Shape {
  points: PointType[] = []
  shape: ShapeEnum = ShapeEnum.SQUARE
  render(): Component {
    return Object()
  }
}
