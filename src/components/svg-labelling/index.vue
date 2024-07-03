<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import type { Graph } from '@antv/x6'
import { graphInit, switchToNext } from './utils/handler'
import labelMenu from './components/label-menu.vue'

const canvasDOM = ref()
const history = useHistoryStore()
let graph: Graph
function render(container: HTMLElement) {
  return graphInit(container)
}
onMounted(() => {
  graph = render(canvasDOM.value)
  switchToNext(graph, 'https://stardust-public.oss-cn-hangzhou.aliyuncs.com/%E5%AE%98%E7%BD%91/%E6%A0%87%E6%B3%A8%E5%B7%A5%E5%85%B7%E9%A2%84%E8%A7%88/%E5%9B%BE%E7%89%87/object_detection.png?x-oss-process=image%2Fformat%2Cwebp', {
    width: 1005,
    height: 671,
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
  width: 1000px;
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
