import type { ImageType, LabelPlaygroundData } from '~@/types/structure'

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
