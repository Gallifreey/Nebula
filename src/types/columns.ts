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
