import type { DatasetCreateFormState, LabelCreateFormState } from '~@/types/form'
import type { DatasetInfo, ImageDataSetDetails, ImageDataShortDetails, ImageType } from '~@/types/structure'

export interface DSResultModel {
  status: string
}

interface DatasetCreateFormModel {
  dataset: Omit<DatasetCreateFormState, 'fileList'>
  file?: any[]
}

interface DatasetDetailsFormModel {
  id: number
  preview: number
  offset: number
}

interface URLResultModel {
  url: string
}

interface NumberModel {
  id: number
}

export function dsCreateApi(params: DatasetCreateFormState) {
  const formData = new FormData()
  formData.append('dataset', JSON.stringify(params))
  for (const file of params.fileList)
    formData.append('files', toRaw(file).originFileObj)
  return usePost<DSResultModel, FormData>('/data_manage/dataset', formData, {
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
export function getDataSetDetailsApi(dsid: number) {
  return useGet<ImageDataShortDetails, DatasetDetailsFormModel>('/data_manage/details', {
    id: dsid,
    preview: 30,
    offset: 0,
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
