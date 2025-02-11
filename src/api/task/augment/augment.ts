import type { DataAugmentTaskInfo } from '~@/types/structure'

// id 所有人ID
export function loadDataAugmentTasks(id: number) {
  return useGet<DataAugmentTaskInfo[], {
    id: number
  }>('/task/augment', {
    id,
  })
}

// dsid 数据集ID info 任务信息
export function addDataAugmentTask(info: DataAugmentTaskInfo) {
  return usePost<null, {
    taskJSON: string
  }>('/task/augment', {
    taskJSON: JSON.stringify(info),
  })
}
