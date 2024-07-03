<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { LabelPopoverTitle } from '~@/utils/constant'

defineProps({
  type: {
    type: Number,
    default: 0,
  },
})
const history = useHistoryStore()
</script>

<template>
  <div
    v-if="history.setting.popover"
    class="popover"
    :style="{
      top: `${history.setting.menuPos.y}px`,
      left: `${history.setting.menuPos.x}px`,
    }"
  >
    <div class="header">
      {{ LabelPopoverTitle[type] }}
    </div>
    <div class="content">
      <span>类别</span>
      <a-select placeholder="选择类别" class="select" clearable />
    </div>
  </div>
</template>

<style lang="less" scoped>
.popover{
  position: absolute;
  height: 150px;
  width: 300px;
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
