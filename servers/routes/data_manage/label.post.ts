import { eventHandler } from 'h3'

export default eventHandler(() => {
  return {
    code: 200,
    msg: '新建成功',
    data: {
      status: 'ok',
    },
  }
})
