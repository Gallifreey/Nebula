<script lang="ts" setup>
import type { SelectProps } from 'ant-design-vue'
import { getDatasetNameAndID } from '~@/api/data-manage/dataset'
import { addDataAugmentTask } from '~@/api/task/augment/augment'
import type { DataCleanTaskFormData } from '~@/types/form'
import { DataAugmentMethods } from '~@/types/static'
import type { DataAugmentTaskInfo } from '~@/types/structure'
import { generateAntdSelectValues } from '~@/utils/tools'

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
})
const emits = defineEmits(['update:show'])
const show = useVModel(props, 'show', emits)
const formState = ref<DataCleanTaskFormData>({
  dsid: 0,
  name: '',
  methods: [],
})
const dsLists = ref<SelectProps['options']>([])
const methods = generateAntdSelectValues([...Array(DataAugmentMethods.length)].map((_, i) => i), DataAugmentMethods)
onMounted(async () => {
  const data = (await getDatasetNameAndID(1)).data
  if (data)
    dsLists.value = data
})
async function addNewAugmentTask() {
  const info: DataAugmentTaskInfo = {
    id: 0,
    name: formState.value.name,
    start_time: '',
    finished_time: '',
    methods: formState.value.methods.join(' '),
    status: 0,
    dsid: formState.value.dsid,
    oid: 1,
  }
  await addDataAugmentTask(info)
  show.value = false
}
</script>

<template>
  <a-modal v-model:open="show" title="新建增强任务" width="50%" @ok="addNewAugmentTask">
    <a-form
      :model="formState"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 10 }"
    >
      <a-form-item
        name="name" label="任务名称" :rules="[{
          required: true,
          message: '必须填写任务名称',
        }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item
        name="dsid" label="数据集ID" :rules="[{
          required: true,
          message: '必须选择数据集ID',
        }]"
      >
        <a-select v-model:value="formState.dsid" :options="dsLists" />
      </a-form-item>
      <a-form-item
        name="methods" label="增强算子" :rules="[{
          required: true,
          message: '必须选择增强算子',
        }]"
      >
        <a-select
          v-model:value="formState.methods"
          :options="methods"
          mode="multiple"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less" scoped>

</style>
