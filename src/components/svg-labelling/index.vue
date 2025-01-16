<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import type { Graph } from '@antv/x6'
import { graphInit, switchToNext } from './utils/handler'
import labelMenu from './components/label-menu.vue'
import type { PlaygroundData } from '~@/types/structure'
import Bus from '~@/utils/bus'

const props = defineProps({
  data: {
    type: Object as PropType<PlaygroundData['image']>,
    required: true,
    default: () => {
      return {
        url: 'https://www.mcmod.cn/static/public/images/logo.png?v=4',
        width: 500,
        height: 500,
      }
    },
  },
})
const emits = defineEmits(['update:data'])
const data = useVModel(props, 'data', emits)
const canvasDOM = ref()
// const history = useHistoryStore()
let graph: Graph
function render(container: HTMLElement) {
  return graphInit(container)
}
onMounted(() => {
  graph = render(canvasDOM.value)
  /*
  switchToNext(graph, data.value.url, {
    width: data.value.width,
    height: data.value.height,
  })
  const node = graph.createNode({
    shape: 'rect',
    position: {
      x: 100,
      y: 100,
    },
    size: {
      height: 100,
      width: 100,
    },
    attrs: {
      rect: {
        'fill': 'rgba(100, 100, 255, 0.5)',
        'stroke': 'black',
        'strokeWidth': 1,
      },
      text: {
        'fontSize': 14,
        'fill': 'white',
        'textAnchor': 'middle',
        'textVerticalAnchor': 'middle',
        'text': 'node',
      },
    },
  })
  graph.addNode(node)
  */
})
Bus.on('on-update', (data: PlaygroundData['image']) => {
  switchToNext(graph, data.url, {
    width: data.width,
    height: data.height,
  })
})
</script>

<template>
  <div class="canvas">
    <div ref="canvasDOM" class="container" />
    <labelMenu />
  </div>
</template>

<style lang="less" scoped>
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
