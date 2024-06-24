<script lang="ts" setup>
import SVGShapeBase from './svg-shape-base.vue'
</script>

<template>
  <SVGShapeBase label="123456" color="pink">
    <template #shape>
      <rect x="0" y="12" width="100" height="100" color="black" />
    </template>
  </SVGShapeBase>
</template>

<style lang="less" scoped>

</style>
