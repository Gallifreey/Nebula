import type { ImageType, LabelPlaygroundData } from '~@/types/structure'

interface NumberModel {
  id: number
}
// dsid 数据集ID
export function getLabelPlaygroundApi(dsid: number, itype: ImageType) {
  return useGet<LabelPlaygroundData<typeof itype>, NumberModel>('/labeling/playground', {
    id: dsid,
  })
}
