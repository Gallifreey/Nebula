<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { Graph } from '@antv/x6'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'

const canvasDOM = ref()
let graph
function render(container: HTMLElement) {
  return new Graph({
    container,
    grid: {
      size: 1,
    },
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.1,
      maxScale: 5,
    },
    background: {
      color: '#f5f5f5',
    },
    panning: {
      enabled: true,
      modifiers: 'ctrl',
    },
    translating: {
      restrict: {
        x: 0,
        y: 0,
        width: 1005,
        height: 671,
      },
    },
    interacting: {
      nodeMovable(view: any) {
        return view.cell.id !== 'bg_image'
      },
    },
  })
}
onMounted(() => {
  graph = render(canvasDOM.value)
  graph.use(
    new Transform({
      resizing: {
        restrict: true,
        enabled(node: any) {
          return node.id !== 'bg_image'
        },
      },
    }),
    new Selection({
      enabled: true,
      multiple: true,
      rubberband: true,
      movable: true,
      showNodeSelectionBox: true,
    }),
  )
  Graph.registerNode(
    'custom-polygon',
    {
      inherit: 'polygon',
      width: 100,
      height: 100,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
    },
  )
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
        'fill': 'rgba(100, 100, 255, 0.2)',
        'stroke': 'black',
        'strokeWidth': 1,
      },
    },
    label: '决策',
  })
  graph.addNode(node)
  graph.addNode({
    shape: 'image',
    x: 0,
    y: 0,
    width: 1005,
    height: 671,
    imageUrl:
    'https://stardust-public.oss-cn-hangzhou.aliyuncs.com/%E5%AE%98%E7%BD%91/%E6%A0%87%E6%B3%A8%E5%B7%A5%E5%85%B7%E9%A2%84%E8%A7%88/%E5%9B%BE%E7%89%87/object_detection.png?x-oss-process=image%2Fformat%2Cwebp',
    zIndex: -1,
    id: 'bg_image',
  })
  graph.centerContent()
})
</script>

<template>
  <div ref="canvasDOM" class="container" />
</template>

<style lang="less" scoped>
.container{
  height: 500px;
  width: 1000px;
}
</style>
