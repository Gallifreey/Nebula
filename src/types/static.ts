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
    value: 5,
    label: '分享链接导入',
  },
  {
    value: 6,
    label: '平台数据集',
  },
  {
    value: 7,
    label: '公开数据集',
  },
  {
    value: 8,
    label: '数据源采集',
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
    value: 5,
    label: '分享链接导入',
  },
  {
    value: 6,
    label: '平台数据集',
  },
  {
    value: 7,
    label: '公开数据集',
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
      {
        value: 3,
        label: '语义分割',
      },
      {
        value: 4,
        label: '3D框标注',
      },
      {
        value: 5,
        label: '关键点检测',
      },
    ],
  },
  {
    value: 10,
    label: '视频',
    children: [
      {
        value: 11,
        label: '视频检测',
      },
      {
        value: 12,
        label: '目标跟踪',
      },
    ],
  },
  {
    value: 20,
    label: '点云',
    children: [
      {
        value: 21,
        label: '点云分割',
      },
      {
        value: 22,
        label: '点云重建',
      },
      {
        value: 23,
        label: '点云混合标注',
      },
    ],
  },
]
