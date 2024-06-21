<script lang="ts" setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:open'])
const openE = useVModel(props, 'open', emits)
</script>

<template>
  <a-drawer v-model:open="openE" title="用户授权" width="40%">
    <a-transfer>
      <template #leftTitle>
        全部子用户
      </template>
      <template #rightTitle>
        授权子用户
      </template>
    </a-transfer>
  </a-drawer>
</template>

<style lang="less" scoped>

</style>
