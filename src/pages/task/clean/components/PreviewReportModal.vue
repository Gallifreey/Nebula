<script lang="ts" setup>
import ImageGrid from './ImageGrid.vue'
import { DataCleanMethods, DataCleanMethodsEng } from '~@/types/static'
import type { DataCleanReport } from '~@/types/structure'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  report: {
    type: Object as PropType<DataCleanReport>,
    required: true,
  },
})
const emits = defineEmits(['update:show'])
const show = useVModel(props, 'show', emits)
const activeKey = ref(0)
</script>

<template>
  <a-modal v-model:open="show" title="预览清洗任务报告" width="50%">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane v-for="(item, index) in report.methods" :key="index" :tab="DataCleanMethods[item]">
        <ImageGrid :images="report[DataCleanMethodsEng[item]]" />
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<style lang="less" scoped>

</style>
