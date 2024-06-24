import { ShapeEnum } from '~@/enums/canvas-enum'

interface PointType {
  x: number
  y: number
}

export abstract class Shape {
  points: PointType[] = []
  shape: ShapeEnum = ShapeEnum.SQUARE
  render(): Component {
    return Object()
  }
}
