<script lang="ts" setup>
import type { EntryType } from '~@/stores/canvas'
import { ECanvasEnum, EMouseStateEnum } from '~@/enums/canvas-enum'

defineProps({
  height: {
    type: Number,
    default: 500,
  },
  width: {
    type: Number,
    default: 1000,
  },
})

const canvasStore = useCanvasStore()

const senceData = reactive({
  canvas: {
    scale: 2.0,
    rotation: 0,
    cursor: {
      x: 0,
      y: 0,
    },
    sence_center: {
      x: 0,
      y: 0,
    },
    layout_center: {
      x: 0,
      y: 0,
    },
  },
})

function onSVGMouseUp() {
  if (canvasStore.canvasSetting.canvas.mouse.state !== EMouseStateEnum.DOWN)
    return
  canvasStore.setCanvasMouse({
    state: EMouseStateEnum.UP,
    cursor: {
      x: 0,
      y: 0,
    },
    before: {
      x: 0,
      y: 0,
    },
    after: {
      x: 0,
      y: 0,
    },
  })
}
function onSVGMouseDown(e: MouseEvent) {
  if (e.button !== 1)
    return
  const { clientX, clientY } = e
  canvasStore.canvasSetting.canvas.action = ECanvasEnum.MOVE
  canvasStore.setCanvasMouse({
    state: EMouseStateEnum.DOWN,
    cursor: {
      x: clientX,
      y: clientY,
    },
    before: {
      x: senceData.canvas.layout_center.x,
      y: senceData.canvas.layout_center.y,
    },
    after: {
      x: senceData.canvas.layout_center.x,
      y: senceData.canvas.layout_center.y,
    },
  })
}
function onSVGMouseMove(e: MouseEvent) {
  const { clientX, clientY } = e
  senceData.canvas.cursor = {
    x: canvasStore.canvasSetting.canvas.mouse.before.x + clientX - canvasStore.canvasSetting.canvas.mouse.cursor.x,
    y: canvasStore.canvasSetting.canvas.mouse.before.y + clientY - canvasStore.canvasSetting.canvas.mouse.cursor.y,
  }
  if (canvasStore.canvasSetting.canvas.mouse.state === EMouseStateEnum.DOWN) {
    canvasStore.canvasSetting.canvas.mouse.after.x = canvasStore.canvasSetting.canvas.mouse.before.x + clientX - canvasStore.canvasSetting.canvas.mouse.cursor.x
    canvasStore.canvasSetting.canvas.mouse.after.y = canvasStore.canvasSetting.canvas.mouse.before.y + clientY - canvasStore.canvasSetting.canvas.mouse.cursor.y
    if (canvasStore.canvasSetting.templateEntry && (canvasStore.canvasSetting.canvas.action === ECanvasEnum.SELECT || canvasStore.canvasSetting.canvas.action === ECanvasEnum.MOVE)) {
      canvasStore.canvasSetting.templateEntry.info.x = canvasStore.canvasSetting.canvas.mouse.after.x
      canvasStore.canvasSetting.templateEntry.info.y = canvasStore.canvasSetting.canvas.mouse.after.y
      canvasStore.canvasSetting.templateEntry.info.client = {
        x: canvasStore.canvasSetting.canvas.mouse.after.x,
        y: canvasStore.canvasSetting.canvas.mouse.after.y,
      }
      canvasStore.canvasSetting.canvas.action = ECanvasEnum.MOVE
    }
    else if (canvasStore.canvasSetting.canvas.action === ECanvasEnum.CANVAS_MOVE) {
      senceData.canvas.layout_center.x = canvasStore.canvasSetting.canvas.mouse.after.x
      senceData.canvas.layout_center.y = canvasStore.canvasSetting.canvas.mouse.after.y
    }
  }
}
function onSVGMouseWheel(e: WheelEvent) {
  const old = senceData.canvas.scale
  senceData.canvas.scale += e.deltaY * -0.001
  if (senceData.canvas.scale <= 0.1 || senceData.canvas.scale >= 5)
    senceData.canvas.scale = old
}
function onEntryMouseLeave(_: EntryType, __: number, e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
}
function onEntryMouseEnter(_: EntryType, __: number, e: MouseEvent) {
  // default event denied
  e.preventDefault()
  e.stopPropagation()
}
function onEntryMouseDown(entry: EntryType, index: number, e: MouseEvent) {
  // default event denied
  e.preventDefault()
  e.stopPropagation()
  canvasStore.canvasSetting.canvas.action = ECanvasEnum.SELECT
  canvasStore.setCanvasTemplateEntry(entry, index)
  canvasStore.setCanvasMouse({
    state: EMouseStateEnum.DOWN,
    cursor: {
      x: e.clientX,
      y: e.clientY,
    },
    before: {
      x: entry.x,
      y: entry.y,
    },
    after: {
      x: entry.x,
      y: entry.y,
    },
  })
}
</script>

<template>
  <div
    class="container"
    :style="{ '--height': `${height}px`, '--width': `${width}px` }"
    @mousewheel="onSVGMouseWheel"
    @mousedown="onSVGMouseDown"
    @mouseup="onSVGMouseUp"
    @mousemove="onSVGMouseMove"
  >
    <span class="point">{{ senceData.canvas.cursor }}</span>
    <svg xmlns="http://www.w3.org/2000/svg" class="canvas">
      <g
        :transform="`translate(${
          (senceData.canvas.sence_center.x + senceData.canvas.layout_center.x) / senceData.canvas.scale
        },${
          (senceData.canvas.sence_center.y + senceData.canvas.layout_center.y) / senceData.canvas.scale
        })rotate(${senceData.canvas.rotation})scale(${senceData.canvas.scale})`"
      >
        <image x="0" y="0" width="500" height="300" xlink:href="https://stardust-public.oss-cn-hangzhou.aliyuncs.com/%E5%AE%98%E7%BD%91/%E6%A0%87%E6%B3%A8%E5%B7%A5%E5%85%B7%E9%A2%84%E8%A7%88/%E5%9B%BE%E7%89%87/object_detection.png?x-oss-process=image%2Fformat%2Cwebp" />
        <g
          v-for="(item, index) in canvasStore.canvasSetting.entries"
          v-show="item.display"
          :key="index"
          :transform="`translate(${item.x / senceData.canvas.scale},${item.y / senceData.canvas.scale})rotate(0)scale(1)`"
        >
          <g
            :transform="`rotate(${item.rotate},${item.realBBOX.x + item.realBBOX.width / 2},${item.realBBOX.y + item.realBBOX.height / 2}) scale(1)`"
            @mouseleave="onEntryMouseLeave(item, index, $event)"
            @mousedown="onEntryMouseDown(item, index, $event)"
            @mouseenter="onEntryMouseEnter(item, index, $event)"
          >
            <rect
              width="100"
              height="100"
              fill="black"
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<style lang="less" scoped>
:root{
  --height: 500px;
  --width: 500px;
}
.container{
  position: relative;
  user-select: none;
  .point{
    position: absolute;
    bottom: 5px;
    left: 5px;
    color: white;
  }
}
.canvas{
  height: var(--height);
  width: var(--width);
  background: #262626;
}
</style>
