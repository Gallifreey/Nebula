<script lang="ts" setup>
import { EditOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  imageMeta: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const emits = defineEmits(['update:checked'])
const hovered = ref(false)
const checkedE = useVModel(props, 'checked', emits)
</script>

<template>
  <div class="container" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <div class="checkbox">
      <a-checkbox v-model:checked="checkedE" />
    </div>
    <div class="thumbnail">
      <img :src="thumbnail">
    </div>
    <div class="info">
      <div class="label">
        {{ label }}
      </div>
      <div v-if="hovered" class="btn">
        <a-space>
          <a-button :icon="h(EditOutlined)" type="text" size="small" />
          <a-button :icon="h(FullscreenOutlined)" type="text" size="small" />
        </a-space>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container{
  position: relative;
  width: 150px;
  height: 200px;
  background: #f6f6f6;
  cursor: pointer;
  .checkbox{
    position: absolute;
    top: 6px;
    left: 6px;
  }
  .thumbnail{
    height: 80%;
    width: 100%;
    display: flex;
    align-items: center;
    img{
      width: 100%;
      object-fit: contain;
    }
  }
  .info{
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
}
</style>
