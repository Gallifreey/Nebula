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
