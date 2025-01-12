import type { DatasetCreateFormState } from '~@/types/form'
import type { DatasetInfo, ImageDataSetDetails, ImageType } from '~@/types/structure'

export interface DSResultModel {
  status: string
}

export function dsCreateApi(params: DatasetCreateFormState) {
  return usePost<DSResultModel, DatasetCreateFormState>('/data_manage/dataset', params, {
    customDev: true,
    loading: true,
  })
}

// sid 项目空间ID
export function getDataSetApi(sid: number) {
  return useGet<DatasetInfo[], number>('/data_manage/dataset', sid)
}

// dsid 数据集ID
export function getDataSetDetailsApi(dsid: number, itype: ImageType) {
  return useGet<ImageDataSetDetails<typeof itype>, number>('/data_manage/dataset_details', dsid)
}
