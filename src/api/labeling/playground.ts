import type { ImageType, Label, LabelPlaygroundData } from '~@/types/structure'

interface NumberModel {
  id: number
}

interface LabelsModel {
  id: number
  pid: number
  labels: string
}

interface PGModel {
  id: number
  [key: string]: number
}

// dsid 数据集ID
export function getLabelPlaygroundApi(dsid: number, itype: ImageType, offset: number = 0) {
  return useGet<LabelPlaygroundData<typeof itype>, PGModel>('/labeling/playground', {
    id: dsid,
    offset,
  })
}

// dsid 数据集ID
export function getLabelsApi(dsid: number) {
  return useGet<Label[], NumberModel>('/labeling/labels', {
    id: dsid,
  })
}

// dsid 数据集ID pid 数据图片ID
export function uploadLabelingDataApi(dsid: number, pid: number, labels: any) {
  return usePost<null, LabelsModel>('/labeling/data/upload', {
    id: dsid,
    pid,
    labels: JSON.stringify(labels),
  })
}
