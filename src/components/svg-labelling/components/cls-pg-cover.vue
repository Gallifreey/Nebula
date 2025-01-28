<script lang="ts" setup>
import type { ClsCoveredPlaygroundData } from '~@/types/structure'
import Bus from '~@/utils/bus'

const label = ref<ClsCoveredPlaygroundData[]>([])
const pointer = ref(0)
Bus.on('on-labels-init', (data: ClsCoveredPlaygroundData[]) => label.value = data)
Bus.on('on-labels-switch', (cur: number) => pointer.value = cur)
Bus.on('on-labels-select', (_data: number, text: string) => {
  label.value[pointer.value].label = text
  label.value[pointer.value].modified = true
})
</script>

<template>
  <div class="classDOM">
    {{ label[pointer].label }}
  </div>
</template>

<style lang="less" scoped>
.classDOM{
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: 200px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 26px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
</style>
