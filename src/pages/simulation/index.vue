<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { fullWindow } from '~@/utils/tools'

function handleFullScreen() {
  fullWindow('ai-drive')
}
</script>

<template>
  <div>
    <PageContainer />
    <a-card id="ai-drive">
      <a-row>
        <a-row>
          <a-button @click="handleFullScreen">
            全屏
          </a-button>
        </a-row>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="20">
          22
        </a-col>
        <a-col :span="4">
          33
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<style lang="less" scoped>

</style>
