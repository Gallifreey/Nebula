<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import type { Graph } from '@antv/x6'
import { graphInit, switchToNext } from './utils/handler'
import LabelMenu from './components/label-menu.vue'
import type { ImageType, PlaygroundData } from '~@/types/structure'
import Bus from '~@/utils/bus'
import { getValueByUniqueIDFromObjArray } from '~@/utils/tools'

const type = ref('')
const canvasDOM = ref()
const config = useConfigStore()
const buffer = useBufferStore()
// const history = useHistoryStore()
let graph: Graph
function render(container: HTMLElement) {
  return graphInit(container)
}
Bus.on('on-labels-select', (value: number, name: string, type: ImageType) => {
  switch (type) {
    case 'classification':
      buffer.updateCurrentData(-1, type, {
        name,
        id: value,
      })
      break
    case 'detection':
      buffer.updateCurrentData(-1, type, {
        name,
        id: value,
        color: getValueByUniqueIDFromObjArray(buffer.labels, 'id', value, 'color'),
      })
  }
})
Bus.on('on-update', (data: PlaygroundData['image'], t: string) => {
  type.value = t
  config.set('currentPGType', t)
  switchToNext(graph, data.url, {
    width: data.width,
    height: data.height,
  })
})
onMounted(() => {
  graph = render(canvasDOM.value)
})
</script>

<template>
  <div class="canvas">
    <div ref="canvasDOM" class="container" />
    <div v-if="type === 'classification'" class="classDOM">
      {{ buffer.currentData?.name }}
    </div>
    <LabelMenu />
  </div>
</template>

<style lang="less" scoped>
.classDOM{
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: 200px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 26px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.canvas{
  position: relative;
}
.container{
  height: 500px;
  width: 100%;
}
.popover{
  position: absolute;
  height: 150px;
  width: 300px;
  z-index: 999;
  background: black;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  .header{
    height: 50px;
    text-align: center;
    background: rgb(26, 30, 41);
    color: white;
    border-radius: 5px 5px 0 0;
  }
  .content{
    height: 150px;
    background: #293043;
    color: white;
    border-radius: 0 0 5px 5px;
  }
}
</style>
