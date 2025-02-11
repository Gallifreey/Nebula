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
  type: number
  labelStatus: number
  importType: number[]
  dataFile: any[]
  labelFile: any[]
  classFile: any[]
  labelFormat?: number
  oid: number
  spid: number
}

export interface LabelCreateFormState {
  name: string
  color: string
  id: number
}

export interface DataCleanTaskFormData {
  dsid: number
  name: string
  methods: string[]
}
