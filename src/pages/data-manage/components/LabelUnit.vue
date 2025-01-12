<script lang="ts" setup>
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue'
import type { Label } from '~@/types/structure'

defineProps({
  meta: {
    type: Object as PropType<Label>,
    required: true,
  },
})
const hovered = ref(false)
const edited = ref(false)
</script>

<template>
  <div
    class="container" :style="{
      borderLeft: `7px solid ${meta.color}`,
    }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="label">
      {{ meta.name }}
    </div>
    <div v-if="!hovered" class="total">
      {{ meta.capacity }}
    </div>
    <div v-else-if="hovered" class="total">
      <a-space>
        <a-button type="text" @click="edited = true">
          <EditOutlined />
        </a-button>
        <a-button type="text">
          <EllipsisOutlined />
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container{
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #dddddd;
  cursor: pointer;
  padding-right: 10px;
  padding-left: 10px;
  margin-bottom: 10px;
  .label{
    display: flex;
  }
  .total{
    margin-left: 10px;
    a{
      font-size: 12px;
    }
  }
}
.container:hover{
  border-right: 1px solid #2468f2;
  border-top: 1px solid #2468f2;
  border-bottom: 1px solid #2468f2;
}
</style>
