import type { DatasetCreateFormState, LabelCreateFormState } from '~@/types/form'
import type { DatasetInfo, ImageDataShortDetails, ImageType } from '~@/types/structure'

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
  formData.append('dataFile', toRaw(params.dataFile[0]).originFileObj)
  formData.append('labelFile', toRaw(params.labelFile[0]).originFileObj)
  formData.append('classFile', toRaw(params.classFile[0]).originFileObj)
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
export function getDataSetImageDetailsApi(dsid: number, preview: number, offset: number) {
  return useGet<Omit<ImageDataShortDetails, 'labels'>, DatasetDetailsFormModel>('/data_manage/images', {
    id: dsid,
    preview,
    offset,
  })
}

// dsid 数据集ID
export function getDataSetLabelDetailsApi(dsid: number) {
  return useGet<ImageDataShortDetails['labels'], NumberModel>('/data_manage/labels', {
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
  return usePost<DSResultModel, LabelCreateFormState>('/data_manage/labels', label, {
    customDev: true,
    loading: true,
  })
}
