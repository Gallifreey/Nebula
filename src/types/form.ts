export interface ProjectSpaceFormState {
  name: string
}

export interface DatasetFormState {
  source: number
  type: number[]
  content: string // name or id
}

export interface DatasetCreateFormState {
  name: string
  dataType: number
  version: number
  labelType: number
  template: number
  labelStatus: number
  importType: number[]
  fileList: any[]
  labelFormat?: number
}

export interface LabelCreateFormState {
  name: string
  color: string
}
