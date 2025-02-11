<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import ControlVideoView from './components/ControlVideoView.vue'
import SenceEditModal from './components/SenceEditModal.vue'
import { fullWindow } from '~@/utils/tools'
import Bus from '~@/utils/bus'

function handleFullScreen() {
  fullWindow('ai-drive')
}
const roadMapView = ref()
const carBackView = ref()
const btnStatus = ref(false)
const websocket = useWebSocketStore()
const modal_open = ref(false)
function handleClickCarlaControl() {
  Bus.emit('on-click-control-carla', btnStatus)
}
function build_control_conntect() {
  websocket.build('control', {
    url: '',
  })
  if (websocket.existed('control')) {
    websocket.on('control')('message', (d) => {
      console.log(d)
    })
  }
}
</script>

<template>
  <PageContainer>
    <template #extra>
      <a-flex gap="middle">
        <a-button type="primary" @click="handleClickCarlaControl">
          {{ !btnStatus ? "启动" : "停止" }}
        </a-button>
        <a-button @click="modal_open = true">
          场景建模
        </a-button>
        <a-button @click="handleFullScreen">
          全屏
        </a-button>
      </a-flex>
    </template>
    <a-card id="ai-drive">
      <a-row :gutter="10">
        <a-col :span="16">
          <ControlVideoView />
        </a-col>
        <a-col :span="8">
          <a-flex gap="small" vertical>
            <a-col>
              <video ref="roadMapView" />
            </a-col>
            <a-col>
              <video ref="carBackView" />
            </a-col>
          </a-flex>
        </a-col>
      </a-row>
    </a-card>
    <SenceEditModal v-model:show="modal_open" />
  </PageContainer>
</template>

<style lang="less" scoped>
img {
  background: black;
  width: 100%;
  user-select: none;
}
video{
  background: black;
  width: 100%;
}
</style>
