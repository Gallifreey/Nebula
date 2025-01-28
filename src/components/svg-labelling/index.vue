<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import type { Graph } from '@antv/x6'
import type { SelectProps } from 'ant-design-vue'
import { graphInit, switchToNext } from './utils/handler'
import LabelMenu from './components/label-menu.vue'
import type { PlaygroundData } from '~@/types/structure'
import Bus from '~@/utils/bus'
import { getValueFromObjArrays } from '~@/utils/tools'

const type = ref('')
const label = ref()
const canvasDOM = ref()
const config = useConfigStore()
// const history = useHistoryStore()
let graph: Graph
function render(container: HTMLElement) {
  return graphInit(container)
}
onMounted(() => {
  graph = render(canvasDOM.value)
})
Bus.on('on-labels-select', (data: number, options: SelectProps['options']) => {
  if (data === -1)
    label.value = null
  if (options)
    label.value = getValueFromObjArrays(options, 'value', 'label', data)
})
Bus.on('on-update', (data: PlaygroundData['image'], t: string) => {
  type.value = t
  config.set('currentPGType', t)
  switchToNext(graph, data.url, {
    width: data.width,
    height: data.height,
  })
})
</script>

<template>
  <div class="canvas">
    <div ref="canvasDOM" class="container" />
    <div v-if="type === 'classification'" class="classDOM">
      {{ label }}
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
