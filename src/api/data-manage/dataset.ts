import type { DatasetCreateFormState, LabelCreateFormState } from '~@/types/form'
import type { DatasetInfo, ImageDataSetDetails, ImageType } from '~@/types/structure'

export interface DSResultModel {
  status: string
}

interface URLResultModel {
  url: string
}

interface NumberModel {
  id: number
}

export function dsCreateApi(params: DatasetCreateFormState) {
  return usePost<DSResultModel, DatasetCreateFormState>('/data_manage/dataset', params, {
    customDev: true,
    loading: true,
  })
}

// sid 项目空间ID
export function getDataSetApi(sid: number) {
  return useGet<DatasetInfo[], NumberModel>('/data_manage/dataset', {
    id: sid,
  })
}

// dsid 数据集ID
export function getDataSetDetailsApi(dsid: number, itype: ImageType) {
  return useGet<ImageDataSetDetails<typeof itype>, NumberModel>('/data_manage/details', {
    id: dsid,
  })
}

// pid 图片ID
export function getSourceImageApi(pid: number) {
  return useGet<URLResultModel, NumberModel>('/data_manage/source_image', {
    id: pid,
  })
}

export function addNewLabelApi(label: LabelCreateFormState) {
  return usePost<DSResultModel, LabelCreateFormState>('/data_manage/label', label, {
    customDev: true,
    loading: true,
  })
}
