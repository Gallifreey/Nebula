<script lang="ts" setup>
import CreateDataAugmentTaskModal from './components/CreateDataAugmentTaskModal.vue'
import { DataAugmentTaskColumn } from '~@/types/columns'
import type { DataAugmentTaskInfo } from '~@/types/structure'
import { loadDataAugmentTasks } from '~@/api/task/augment/augment'
import { DataAugmentMethods } from '~@/types/static'

const showModal = ref(false)
const loading = ref(true)
const data = ref<DataAugmentTaskInfo[]>([])
onMounted(async () => {
  const data_ = (await loadDataAugmentTasks(1)).data
  if (data_) {
    data.value = data_
    loading.value = false
  }
})
</script>

<template>
  <PageContainer>
    <a-card>
      <a-button type="primary" @click="showModal = true">
        新建增强任务
      </a-button>
      <a-divider />
      <a-table
        :loading="loading"
        :data-source="data"
        :columns="DataAugmentTaskColumn"
      >
        <template #bodyCell="{ record, column }">
          <template v-if="column.dataIndex === 'methods'">
            <div style="width: 150px;text-overflow: ellipsis; overflow: hidden;white-space: nowrap;">
              <a-tooltip :title="record.methods.split(' ').map((method: string) => DataAugmentMethods[parseInt(method)]).join(', ')">
                <a-tag v-for="(method, index) in record.methods.split(' ')" :key="index">
                  {{ DataAugmentMethods[parseInt(method)] }}
                </a-tag>
              </a-tooltip>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>
    <CreateDataAugmentTaskModal v-model:show="showModal" />
  </PageContainer>
</template>

<style lang="less" scoped>

</style>
