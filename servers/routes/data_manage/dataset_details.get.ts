import { eventHandler } from 'h3'
import type { ImageDataSetDetails } from '~@/types/structure'

const data: ImageDataSetDetails<'classification'> = {
  labels: [
    {
      id: 1,
      name: 'string',
      color: 'orange',
      capacity: 50,
    },
    {
      id: 2,
      name: 'string111',
      color: 'orange',
      capacity: 10,
    },
  ],
  images: [
    {
      id: 1,
      path: '1111',
      thumbnail: 'https://ts2.cn.mm.bing.net/th?id=OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
      type: 'classification',
      labelData: {
        labelName: 'string',
        labelID: 1,
      },
    },
  ],
}

export default eventHandler(() => {
  return {
    code: 200,
    msg: '获取成功',
    data,
  }
})
