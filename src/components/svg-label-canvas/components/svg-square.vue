<script lang="ts" setup>
import SVGShapeBase from './svg-shape-base.vue'
</script>

<template>
  <SVGShapeBase label="123456" color="pink">
    <template #shape>
      <rect x="0" y="12" width="80" height="150" fill="rgba(0, 0, 255, 0.1)" stroke="rgb(0, 0, 255)" stroke-width="0.2" />
      <circle class="circle" cx="0" cy="12" r="1" />
      <circle class="circle" cx="80" cy="12" r="1" />
      <circle class="circle" cx="0" cy="162" r="1" />
      <circle class="circle" cx="80" cy="162" r="1" />
    </template>
  </SVGShapeBase>
</template>

<style lang="less" scoped>
.circle{
  cursor: se-resize;
}
</style>
