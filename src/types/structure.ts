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

export interface DataCleanTaskInfo {
  id: number
  name: string
  start_time: string
  finished_time: string
  methods: string
  status: number
  log_id: number
  dsid: number
  oid: number
}

export interface DataAugmentTaskInfo {
  id: number
  name: string
  start_time: string
  finished_time: string
  methods: string
  status: number
  dsid: number
  oid: number
}

export interface DataCleanReport {
  methods: number[]
  blurry?: Image[]
  size?: Image[]
  shape?: Image[]
  brightness?: Image[]
  contrast?: Image[]
  color?: Image[]
  low_information?: Image[]
  duplicate?: Image[]
}

export interface PieData {
  legendData: string[]
  seriesData: number[]
}

export interface ChartData {
  seriesData: number[]
  xAxisData: number[]
}

export interface RawChartData {
  label: any
  value: number
}

export interface AnalyiseReport {
  entityMode: PieData
  entityResolution: ChartData
  entityAspectRatio: ChartData
  entityClarity: ChartData
  entityColorCast: ChartData
}
