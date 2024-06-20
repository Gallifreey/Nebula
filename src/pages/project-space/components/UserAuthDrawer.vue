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
    1
  </a-drawer>
</template>

<style lang="less" scoped>

</style>
