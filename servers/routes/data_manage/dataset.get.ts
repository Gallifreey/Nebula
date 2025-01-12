import { eventHandler } from 'h3'
import type { DatasetInfo } from '~@/types/structure'

const data: DatasetInfo[] = [
  {
    version: 1,
    id: 212233,
    capacity: 95,
    importStatus: 0,
    type: 0,
    labelStatus: 50,
    name: '垃圾分类',
    groupID: 12345,
    createTime: '2024-06-13 13:01:55',
    totalLabels: 0,
    size: 0,
  },
  {
    version: 2,
    id: 2122330,
    capacity: 195,
    importStatus: 1,
    type: 0,
    labelStatus: 50,
    name: '垃圾分类2',
    groupID: 123450,
    createTime: '2024-06-13 13:01:55',
    totalLabels: 0,
    size: 0,
  },
]

export default eventHandler(() => {
  return {
    code: 200,
    msg: '获取成功',
    data,
  }
})
