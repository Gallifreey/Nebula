<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { Graph } from '@antv/x6'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { History } from '@antv/x6-plugin-history'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import type { PointType } from '~@/types/canvas'

const canvasDOM = ref()
const popover = ref(false)
const clicked = ref(false)
const stack: Array<[string, any]> = []
const menuPos = ref<PointType>({
  x: 0,
  y: 0,
})
let graph: Graph
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
  graph.on('node:click', ({ view }) => {
    if (view.cell.isNode() && view.cell.id !== 'bg_image') {
      clicked.value = true
      const pos = graph.localToGraph(view.cell.getBBox())
      const bbox = view.container.getBoundingClientRect()
      popover.value = true
      menuPos.value = {
        x: pos.x + bbox.width + 5,
        y: pos.y,
      }
    }
    else {
      clicked.value = false
      popover.value = false
    }
  })
  graph.on('node:resizing', () => {
    popover.value = false
  })
  graph.on('node:moved', ({ view }) => {
    if (clicked.value && view.cell.isNode() && view.cell.id !== 'bg_image') {
      const pos = graph.localToGraph(view.cell.getBBox())
      const bbox = view.container.getBoundingClientRect()
      popover.value = true
      menuPos.value = {
        x: pos.x + bbox.width + 5,
        y: pos.y,
      }
    }
    else {
      popover.value = false
    }
  })
  graph.on('node:resized', ({ view }) => {
    if (view.cell.isNode() && view.cell.id !== 'bg_image') {
      const pos = graph.localToGraph(view.cell.getBBox())
      const bbox = view.container.getBoundingClientRect()
      popover.value = true
      menuPos.value = {
        x: pos.x + bbox.width + 5,
        y: pos.y,
      }
    }
    else {
      popover.value = false
    }
  })
  graph.on('node:mouseenter', ({ node }) => {
    if (node && node.id !== 'bg_image') {
      stack.push(['rect/stroke', node.getAttrs().rect.stroke])
      stack.push(['rect/strokeWidth', node.getAttrs().rect.strokeWidth])
      node.attr('rect/stroke', 'blue')
      node.attr('rect/strokeWidth', 2)
    }
  })
  graph.on('node:mouseleave', ({ node }) => {
    if (node && node.id !== 'bg_image') {
      node.attr(stack[0][0], stack[0][1])
      node.attr(stack[1][0], stack[1][1])
    }
  })
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
    new History({
      enabled: true,
    }),
    new Keyboard({
      enabled: true,
    }),
  )
  graph.bindKey('ctrl+z', () => {
    console.log(graph.canRedo())
    graph.undo()
  })
  graph.bindKey('ctrl+y', () => {
    graph.redo()
  })
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
  <div class="canvas">
    <div ref="canvasDOM" class="container" />
    <div
      v-if="popover"
      class="popover"
      :style="{
        top: `${menuPos.y}px`,
        left: `${menuPos.x}px`,
      }"
    >
      <div class="header">
        111
      </div>
      <div class="content">
        111
      </div>
    </div>
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
