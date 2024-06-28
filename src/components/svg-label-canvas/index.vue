<script lang="ts" setup>
import SVGSquare from './components/svg-square.vue'
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
    if (canvasStore.canvasSetting.canvas.action === ECanvasEnum.MOVE) {
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
          senceData.canvas.sence_center.x + senceData.canvas.layout_center.x
        },${
          senceData.canvas.sence_center.y + senceData.canvas.layout_center.y
        })rotate(${senceData.canvas.rotation})scale(${senceData.canvas.scale})`"
      >
        <image x="0" y="0" width="500" height="300" xlink:href="https://stardust-public.oss-cn-hangzhou.aliyuncs.com/%E5%AE%98%E7%BD%91/%E6%A0%87%E6%B3%A8%E5%B7%A5%E5%85%B7%E9%A2%84%E8%A7%88/%E5%9B%BE%E7%89%87/object_detection.png?x-oss-process=image%2Fformat%2Cwebp" />
        <SVGSquare />
        <SVGSquare />
        <SVGSquare />
        <SVGSquare />
        <SVGSquare />
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
