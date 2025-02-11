<script lang="ts" setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
})
const emits = defineEmits(['update:show'])
const show = useVModel(props, 'show', emits)
</script>

<template>
  <a-modal v-model:open="show" class="sence-model" title="场景建模" width="70%" @close="show = false">
    <a-row>
      {{ show }}
    </a-row>
    <a-row :gutter="10">
      <a-col :span="17">
        <img>2
      </a-col>
      <a-col :span="7">
        <img>3
      </a-col>
    </a-row>
  </a-modal>
</template>

<style lang="less" scoped>
</style>
