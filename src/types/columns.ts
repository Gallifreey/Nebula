import type { TableColumnsType } from 'ant-design-vue'

export const ProjectSpaceAuthColumn: TableColumnsType = [
  {
    title: '角色名称',
    width: 200,
    dataIndex: 'role',
    align: 'center',
  },
  {
    title: '角色描述',
    width: 600,
    dataIndex: 'description',
    align: 'center',
  },
  {
    title: '已授权用户数',
    width: 200,
    dataIndex: 'authTotal',
    align: 'center',
  },
  {
    title: '操作',
    width: 200,
    dataIndex: 'action',
    align: 'center',
  },
]

export const DatasetColumn: TableColumnsType = [
  {
    title: '版本',
    width: 100,
    dataIndex: 'version',
    align: 'center',
  },
  {
    title: '数据集ID',
    width: 150,
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '数据量',
    width: 100,
    dataIndex: 'capacity',
    align: 'center',
  },
  {
    title: '最近导入状态',
    width: 150,
    dataIndex: 'importStatus',
    align: 'center',
  },
  {
    title: '标注类型',
    width: 200,
    dataIndex: 'type',
    align: 'center',
  },
  {
    title: '标注状态',
    width: 150,
    dataIndex: 'labelStatus',
    align: 'center',
  },
  {
    title: '操作',
    width: 200,
    dataIndex: 'action',
    align: 'center',
  },
]

export const DataCleanTaskColumn: TableColumnsType = [
  {
    title: 'ID',
    width: 60,
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '名称',
    width: 150,
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '任务开始时间',
    width: 200,
    dataIndex: 'start_time',
    align: 'center',
  },
  {
    title: '任务结束时间',
    width: 200,
    dataIndex: 'finished_time',
    align: 'center',
  },
  {
    title: '清洗方法标签',
    width: 200,
    dataIndex: 'methods',
    align: 'center',
  },
  {
    title: '清洗状态',
    width: 100,
    dataIndex: 'status',
    align: 'center',
  },
  {
    title: '数据集ID',
    width: 100,
    dataIndex: 'dsid',
    align: 'center',
  },
  {
    title: '操作',
    width: 60,
    dataIndex: 'action',
    align: 'center',
  },
]

export const DataAugmentTaskColumn: TableColumnsType = [
  {
    title: 'ID',
    width: 60,
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '名称',
    width: 150,
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '任务开始时间',
    width: 200,
    dataIndex: 'start_time',
    align: 'center',
  },
  {
    title: '任务结束时间',
    width: 200,
    dataIndex: 'finished_time',
    align: 'center',
  },
  {
    title: '增强算子标签',
    width: 200,
    dataIndex: 'methods',
    align: 'center',
  },
  {
    title: '增强状态',
    width: 100,
    dataIndex: 'status',
    align: 'center',
  },
  {
    title: '数据集ID',
    width: 100,
    dataIndex: 'dsid',
    align: 'center',
  },
]
