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
})
const emits = defineEmits(['update:color', 'update:label'])
const colorE = useVModel(props, 'color', emits)
const labelE = useVModel(props, 'label', emits)
const hovered = ref(false)
const edited = ref(false)
</script>

<template>
  <div class="top-layer">
    <div class="prefix">
      <slot name="prefix" class="prefix" />
    </div>
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
      <div v-if="!hovered && !edited" class="suffix">
        <slot name="suffix" />
      </div>
      <div v-else-if="hovered && !edited" class="suffix">
        <a-space>
          <a-button type="text" @click="edited = true">
            <EditOutlined />
          </a-button>
          <a-button type="text">
            <EllipsisOutlined />
          </a-button>
        </a-space>
      </div>
      <div v-else class="suffix">
        <a-space>
          <a>确定</a>
          <a>取消</a>
        </a-space>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top-layer{
  height: 100%;
  width: 100%;
  display: flex;
  border: 1px solid #dddddd;
  cursor: pointer;
  margin-bottom: 10px;
}
.prefix{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container{
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  padding-left: 10px;
  .label{
    display: flex;
  }
  .suffix{
    display: flex;
    align-items: center;
    color: gray;
    margin-left: 10px;
    a{
      font-size: 10px;
    }
  }
}
.container:hover{
  border-right: 1px solid #2468f2;
  border-top: 1px solid #2468f2;
  border-bottom: 1px solid #2468f2;
}
</style>
