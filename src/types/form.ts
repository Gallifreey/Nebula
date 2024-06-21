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
}
