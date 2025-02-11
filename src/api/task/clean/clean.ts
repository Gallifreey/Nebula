import type { DataCleanTaskInfo } from '~@/types/structure'

// id 所有人ID
export function loadDataCleanTasks(id: number) {
  return useGet<DataCleanTaskInfo[], {
    id: number
  }>('/task/clean', {
    id,
  })
}

// dsid 数据集ID info 任务信息
export function addDataCleanTask(info: DataCleanTaskInfo) {
  return usePost<null, {
    taskJSON: string
  }>('/task/clean', {
    taskJSON: JSON.stringify(info),
  })
}

export function getTaskReport(id: number) {
  return useGet<string, {
    id: number
  }>('/task/report', {
    id,
  })
}
