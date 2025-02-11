<script lang="ts" setup>
import LabelImage from '@/pages/data-manage/components/LabelImage.vue'
import type { Image } from '@/types/structure'

defineProps({
  images: {
    type: Object as PropType<Image[]>,
    required: true,
  },
})
</script>

<template>
  <div class="container">
    <a-flex wrap="wrap" gap="small">
      <LabelImage v-for="(image, index) in images" :key="index" :pid="image.id" :checked="false" :name="image.name" :thumbnail="image.thumbnail" />
    </a-flex>
  </div>
</template>

<style lang="less" scoped>

</style>
