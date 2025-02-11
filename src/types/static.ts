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

export enum RESPONSE_CODE {
  OK = 200,
  CREATE_FAILED = 400,
  SERVER_ERROR = 401,
}

export const DataCleanMethods: string[] = [
  '模糊度检测',
  '尺寸检测',
  '宽高比检测',
  '亮度检测',
  '对比度检测',
  '颜色检测',
  '低信息量检测',
]

export const DataCleanMethodsEng: string[] = [
  'blurry',
  'size',
  'shape',
  'brightness',
  'contrast',
  'color',
  'low_information',
]

export const DataAugmentMethods: string[] = [
  '仿射变换',
  '分段仿射变换',
  '弹性变换',
  '裁剪',
  '上下翻转',
  '左右翻转',
  '调整尺寸',
  '加法',
  '乘法',
  '加性高斯噪声',
  '随机丢弃',
  '粗粒化丢弃',
  '反转',
  '日光化',
  '对比度归一化',
  '灰度化',
  'JPEG 压缩',
  '卡通化',
  '序列化',
  '部分应用',
  '随机选择',
  '有时应用',
  '边缘检测',
  '定向边缘检测',
  '锐化',
  '浮雕',
  '混合透明度',
  '超像素',
]

export const DataAugmentMethodsEng: string[] = [
  'affine',
  'piecewise_affine',
  'elastic',
  'crop',
  'flipud',
  'fliplr',
  'resize',
  'add',
  'multiply',
  'gaussian_noise',
  'dropout',
  'coarse_dropout',
  'invert',
  'solarize',
  'contrast',
  'grayscale',
  'jpeg_compression',
  'cartoon',
  'sequential',
  'some_of',
  'one_of',
  'sometimes',
  'edge_detect',
  'directed_edge_detect',
  'sharpen',
  'emboss',
  'blend_alpha',
  'superpixels',
]
