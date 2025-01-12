export interface DatasetInfo {
  version: number
  id: number
  capacity: number
  importStatus: number
  type: number
  labelStatus: number
  name: string
  groupID: number
  createTime: string
  totalLabels: number
  size: number
}

export interface Label {
  id: number
  name: string
  color: string
  capacity: number
}

export interface ImageClassificationLabel {
  labelName: string
  labelID: number
}

export interface ObjectDetectionLabel {
  labelName: string
  labelID: number
  x: number
  y: number
  width: number
  height: number
}

export type ImageType = 'classification' | 'detection'

export interface Image<T extends ImageType> {
  id: number
  path: string
  thumbnail: string
  type: T
  labelData: T extends 'classification' ? ImageClassificationLabel : ObjectDetectionLabel[]
}

export interface ImageDataSetDetails<T extends ImageType> {
  labels: Label[]
  images: Image<T>[]
}
