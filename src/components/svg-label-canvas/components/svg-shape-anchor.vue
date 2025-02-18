<script lang="ts" setup>
import { EMouseStateEnum } from '~@/enums/canvas-enum'
import type { PointType } from '~@/types/canvas'

type DirectionType = 'rowSide' | 'columnSide' | 'leftSide' | 'rightSide'
const props = defineProps({
  direction: {
    type: String as PropType<DirectionType>,
    default: 'rowSide',
  },
  callback: {
    type: Function,
    default: null,
  },
  center: {
    type: Object as PropType<PointType>,
    default: () => {
      return {
        x: 0,
        y: 0,
      }
    },
  },
  r: {
    type: Number,
    default: 1,
  },
  fill: {
    type: String,
    default: 'black',
  },
  index: {
    type: Number,
    default: 0,
  },
})
const centerPoint = ref(props.center)
const r = ref(props.r)
let state = EMouseStateEnum.IDLE
const mouse = ref({
  x: 0,
  y: 0,
})
const directionMap: Map<DirectionType, string> = new Map([
  ['rowSide', 'ns-resize'],
  ['columnSide', 'es-resize'],
  ['leftSide', 'nwse-resize'],
  ['rightSide', 'nesw-resize'],
])
function onPointDown(e: MouseEvent) {
  mouse.value = {
    x: e.clientX,
    y: e.clientY,
  }
  state = EMouseStateEnum.DOWN
}
function onPointUp() {
  mouse.value = {
    x: 0,
    y: 0,
  }
  state = EMouseStateEnum.IDLE
}
function onPointMove(e: MouseEvent) {
  if (state !== EMouseStateEnum.DOWN)
    return
  props.callback(e, mouse.value, props.index)
  mouse.value = {
    x: e.clientX,
    y: e.clientY,
  }
}
function onPointIn() {
  r.value *= 2
}
function onPointLeave() {
  r.value /= 2
  state = EMouseStateEnum.IDLE
}
</script>

<template>
  <circle
    :style="{
      cursor: directionMap.get(direction),
    }"
    :r="r"
    :cx="centerPoint.x"
    :cy="centerPoint.y"
    :fill="fill"
    class="anchor"
    @mouseup="onPointUp"
    @mousedown="onPointDown"
    @mouseenter="onPointIn"
    @mouseleave="onPointLeave"
    @mousemove="onPointMove"
  />
</template>

<style lang="less" scoped>

</style>
