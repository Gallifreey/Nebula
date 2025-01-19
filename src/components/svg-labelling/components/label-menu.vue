<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import type { SelectProps } from 'ant-design-vue'
import type { Label } from '~@/types/structure'
import { LabelPopoverTitle } from '~@/utils/constant'
import { generateAntdSelectValues, generateArrayFromObjArrays } from '~@/utils/tools'
import Bus from '~@/utils/bus'

defineProps({
  type: {
    type: Number,
    default: 0,
  },
})
const history = useHistoryStore()
const config = useConfigStore()
const options = ref<SelectProps['options']>()
Bus.on('on-labels-update', (data: Label[]) => {
  const values = generateArrayFromObjArrays(data, 'id')
  const labels = generateArrayFromObjArrays(data, 'name')
  options.value = generateAntdSelectValues(values, labels)
})
function onSelect(value: any) {
  Bus.emit('on-labels-select', value)
}
</script>

<template>
  <div
    v-if="history.setting.popover"
    class="popover"
    :style="{
      top: `${history.setting.menuPos.y}px`,
      left: `${history.setting.menuPos.x}px`,
      width: `${config.get('contextMenuWidth')}px`,
    }"
  >
    <div class="header">
      {{ LabelPopoverTitle[config.get('contextMenuTitleType')] }}
    </div>
    <div class="content">
      <span>类别</span>
      <a-select :options="options" placeholder="选择类别" class="select" clearable @select="onSelect" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.popover{
  position: absolute;
  height: 150px;
  z-index: 999;
  background: black;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  .header{
    padding: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    text-align: left;
    background: rgb(26, 30, 41);
    color: white;
    border-radius: 5px 5px 0 0;
  }
  .content{
    padding: 10px;
    height: 150px;
    background: #293043;
    color: white;
    border-radius: 0 0 5px 5px;
    display: flex;
    flex-direction: column;
    span{
      font-weight: bold;
    }
    .select{
      background: transparent;
      border: none;
      margin-top: 5px;
    }
  }
}
</style>
