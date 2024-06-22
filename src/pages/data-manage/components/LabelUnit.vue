<script lang="ts" setup>
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
  },
})
const emits = defineEmits(['update:color', 'update:label'])
const colorE = useVModel(props, 'color', emits)
const labelE = useVModel(props, 'label', emits)
const hovered = ref(false)
const edited = ref(false)
</script>

<template>
  <div
    class="container" :style="{
      borderLeft: `7px solid ${color}`,
    }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div v-if="!edited" class="label">
      {{ label }}
    </div>
    <div v-else class="label">
      <a-input v-model:value="colorE" type="color" style="width: 45px;" />
      <a-input v-model:value="labelE" style="margin-left: 5px" />
    </div>
    <div v-if="!hovered && !edited" class="total">
      {{ total }}
    </div>
    <div v-else-if="hovered && !edited" class="total">
      <a-space>
        <a-button type="text" @click="edited = true">
          <EditOutlined />
        </a-button>
        <a-button type="text">
          <EllipsisOutlined />
        </a-button>
      </a-space>
    </div>
    <div v-else class="total">
      <a-space>
        <a>确定</a>
        <a>取消</a>
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
