<script lang="ts" setup>
import SVGShapeBase from './svg-shape-base.vue'
import SVGShapeAnchor from './svg-shape-anchor.vue'
import { generateBBoxByLR, generatePointString } from '~@/utils/tools'
import type { PointType } from '~@/types/canvas'

const props = defineProps({
  topLeft: {
    type: Object as PropType<PointType>,
    default: () => {
      return {
        x: 0,
        y: 12,
      }
    },
  },
  bottomRight: {
    type: Object as PropType<PointType>,
    default: () => {
      return {
        x: 80,
        y: 175,
      }
    },
  },
})
const pointsList = reactive(generateBBoxByLR(props.topLeft, props.bottomRight))
const points = computed(() => {
  return generatePointString(pointsList)
})
function anchorMove(e: MouseEvent, mouse: PointType, index: number) {
  const { clientX, clientY } = e
  pointsList[index] = {
    x: pointsList[index].x + clientX - mouse.x,
    y: pointsList[index].y + clientY - mouse.y,
  }
}
</script>

<template>
  <SVGShapeBase label="123456" color="pink">
    <template #shape>
      <polygon :points="points" fill="rgba(0, 0, 255, 0.1)" stroke="rgb(0, 0, 255)" stroke-width="0.2" />
      <SVGShapeAnchor v-for="(item, index) in pointsList" :key="index" :index="index" :center="item" :callback="anchorMove" />
    </template>
  </SVGShapeBase>
</template>

<style lang="less" scoped>
.circle{
  cursor: se-resize;
}
</style>
