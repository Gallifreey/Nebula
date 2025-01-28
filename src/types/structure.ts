export interface DatasetInfo {
  version: string
  id: number
  capacity: number
  importStatus: number
  type: number
  labelingStatus: number
  name: string
  groupID: number
  createTime: string
  labeled: number
  totalLabels: number
  size: number
  source: number
}

export interface Label {
  id: number
  name: string
  color: string
  capacity: number
}

export interface ImageClassificationLabel {
  name: string
  id: number
}

export interface ObjectDetectionLabel {
  name: string
  id: number
  x: number
  y: number
  width: number
  height: number
}

export const ImageTypeKeys = ['classification', 'detection']
export type ImageType = 'classification' | 'detection'

export interface Image {
  id: number
  name: string
  thumbnail: string
}

export interface ImageDataShortDetails {
  labels?: {
    id: number
    name: string
    color: string
  }[]
  images?: {
    id: number
    name: string
    thumbnail: string
  }[]
  capacity?: number
}

export interface LabelPlaygroundData<T extends ImageType> {
  items: {
    image: Image
    annotation: T extends 'classification' ? ImageClassificationLabel : ObjectDetectionLabel
  }[]
  capacity: number
}

export interface PlaygroundData {
  image: {
    url: string
    height: number
    width: number
  }
}

export interface ClsCoveredPlaygroundData {
  modified: boolean
  label?: string
}
