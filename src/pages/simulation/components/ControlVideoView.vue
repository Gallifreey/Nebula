<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { connectSimulationEnd } from '~@/api/simulation/simulation'
import Bus from '~@/utils/bus'
import { listenKeyboardEvents } from '~@/utils/tools'

const carla_manuel_control_socket = new WebSocket('ws://127.0.0.1:1555/carla_manuel_control')
const mainView = ref()
const pressedKeys = ref<string>('')
async function controlCarla(btnStatus: Ref<boolean>) {
  await connectSimulationEnd(0, !btnStatus.value ? 1 : 0)
  if (!btnStatus.value) {
    const channel = 1
    const streamUrl = `http://127.0.0.1:1555/api_sim/simulation/stream?id=1&channel=${channel}`
    mainView.value.src = streamUrl
  }
  else {
    mainView.value.src = ''
  }
  btnStatus.value = !btnStatus.value
}
Bus.on('on-click-control-carla', controlCarla)
onMounted(() => {
  mainView.value.setAttribute('tabindex', '0')
  listenKeyboardEvents(mainView.value, (keys) => {
    pressedKeys.value = keys
    carla_manuel_control_socket.send(keys)
  })
  carla_manuel_control_socket.onopen = () => {
    message.success('连接Carla成功')
  }
})
</script>

<template>
  <img ref="mainView">
</template>

<style lang="less" scoped>
img {
  background: black;
  width: 100%;
  height: 100%;
  user-select: none;
  border: none;
}
</style>
