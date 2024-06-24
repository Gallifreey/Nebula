<script lang="ts" setup>
import { ECanvasEnum, EMouseStateEnum } from '~@/enums/canvas-enum'

const props = defineProps({
  hasLabel: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#ddd',
  },
})
const labelLength = computed(() => {
  return props.label.length * 12 * 0.6
})
const labelHeight = computed(() => {
  return 12
})
const senceData = reactive({
  state: EMouseStateEnum.UP,
  action: ECanvasEnum.IDLE,
  origin: {
    x: 0,
    y: 0,
  },
  delta: {
    x: 0,
    y: 0,
  },
  storeMouse: {
    x: 10,
    y: 10,
  },
})
function onSVGMouseUp(e: MouseEvent) {
  if (senceData.state !== EMouseStateEnum.DOWN)
    return
  const { clientX, clientY } = e
  senceData.state = EMouseStateEnum.IDLE
  senceData.storeMouse = {
    x: clientX,
    y: clientY,
  }
}
function onSVGMouseDown(e: MouseEvent) {
  if (e.button === 1)
    return
  const { clientX, clientY } = e
  senceData.action = ECanvasEnum.MOVE
  senceData.state = EMouseStateEnum.DOWN
  senceData.storeMouse = {
    x: clientX,
    y: clientY,
  }
}
function onSVGMouseMove(e: MouseEvent) {
  const { clientX, clientY } = e
  if (senceData.state === EMouseStateEnum.DOWN) {
    if (senceData.action === ECanvasEnum.MOVE) {
      senceData.delta = {
        x: senceData.delta.x + clientX - senceData.storeMouse.x,
        y: senceData.delta.y + clientY - senceData.storeMouse.y,
      }
      senceData.storeMouse = {
        x: clientX,
        y: clientY,
      }
    }
  }
}
function onSVGMouseLeave() {
  senceData.state = EMouseStateEnum.IDLE
  senceData.action = ECanvasEnum.IDLE
}
const textCenter = computed(() => {
  return {
    x: (0 + labelLength.value) / 2,
    y: (0 + labelHeight.value) / 2,
  }
})
</script>

<template>
  <g
    :transform="`translate(${
      senceData.delta.x / 2
    },${
      senceData.delta.y / 2
    })`"
    @mouseleave="onSVGMouseLeave"
    @mousedown="onSVGMouseDown"
    @mouseup="onSVGMouseUp"
    @mousemove="onSVGMouseMove"
  >
    <g>
      <rect
        x="0"
        y="0"
        :width="labelLength"
        :height="labelHeight"
        rx="3"
        :fill="color"
      />
      <text :x="textCenter.x" :y="textCenter.y" dominant-baseline="middle" text-anchor="middle" stroke-width="0.5" font-size="2">
        {{ label }}
      </text>
    </g>
    <slot name="shape" />
  </g>
</template>

<style lang="less" scoped>

</style>
