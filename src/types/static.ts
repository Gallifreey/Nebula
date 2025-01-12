import type { CascaderProps, SelectProps } from 'ant-design-vue'

export const DataSetImportStatusMap = new Map([
  [0, '已完成'],
  [1, '导入失败'],
])

export const importTypeStaticSelectData: CascaderProps['options'] = [
  {
    value: 0,
    label: '本地导入',
    children: [
      {
        value: 1,
        label: '上传压缩包',
      },
      {
        value: 2,
        label: '上传图片',
      },
    ],
  },
  {
    value: 3,
    label: '平台数据集',
  },
]

export const importTypeHasLabelStaticSelectData: CascaderProps['options'] = [
  {
    value: 0,
    label: '本地导入',
    children: [
      {
        value: 1,
        label: '上传压缩包',
      },
    ],
  },
  {
    value: 2,
    label: '平台数据集',
  },
]

export const sourceStaticSelectData: SelectProps['options'] = [
  {
    value: 0,
    label: '我的数据集',
  },
  {
    value: 1,
    label: '公开数据集',
  },
]
export const typeStaticSelectData: CascaderProps['options'] = [
  {
    value: 0,
    label: '图片',
    children: [
      {
        value: 1,
        label: '图片分类',
      },
      {
        value: 2,
        label: '物体检测',
      },
    ],
  },
]
