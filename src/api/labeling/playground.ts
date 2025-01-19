import type { ImageType, Label, LabelPlaygroundData } from '~@/types/structure'

interface NumberModel {
  id: number
}

interface PGModel {
  id: number
  offset: number
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
