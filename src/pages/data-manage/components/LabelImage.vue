<script lang="ts" setup>
import { EditOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'
import { getSourceImageApi } from '~@/api/data-manage/dataset'

const props = defineProps({
  pid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
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
const url = ref('')
const checkedE = useVModel(props, 'checked', emits)
const visible = ref<boolean>(false)
function setVisible(value: boolean): void {
  if (value)
    handleGetSourceImage()
  visible.value = value
}
async function handleGetSourceImage() {
  const u = (await getSourceImageApi(props.pid)).data
  if (u)
    url.value = u.url
}
</script>

<template>
  <div class="container" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <div class="checkbox">
      <a-checkbox v-model:checked="checkedE" disabled />
    </div>
    <div class="thumbnail">
      <img :src="thumbnail">
    </div>
    <div class="info">
      <div class="label">
        {{ name }}
      </div>
      <div v-if="hovered" class="btn">
        <a-space>
          <a-button :icon="h(EditOutlined)" type="text" size="small" />
          <a-button :icon="h(FullscreenOutlined)" type="text" size="small" @click="() => setVisible(true)" />
        </a-space>
      </div>
    </div>
    <a-image
      :width="200"
      :style="{ display: 'none' }"
      :preview="{
        visible,
        onVisibleChange: setVisible,
      }"
      :src="url"
    />
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
