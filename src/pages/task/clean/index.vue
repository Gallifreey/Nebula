<script lang="ts" setup>
import CreateDataCleanTaskModal from './components/CreateDataCleanTaskModal.vue'
import PreviewReportModal from './components/PreviewReportModal.vue'
import { getTaskReport, loadDataCleanTasks } from '~@/api/task/clean/clean'
import { DataCleanTaskColumn } from '~@/types/columns'
import type { DataCleanReport, DataCleanTaskInfo } from '~@/types/structure'
import { DataCleanMethods } from '~@/types/static'

const loading = ref(true)
const data = ref<DataCleanTaskInfo[]>([])
const showModal = ref(false)
const showReport = ref(false)
const report = ref<DataCleanReport>({})
onMounted(async () => {
  const data_ = (await loadDataCleanTasks(1)).data
  if (data_) {
    data.value = data_
    loading.value = false
  }
})
async function handlePreViewLog(id: number) {
  const content = (await getTaskReport(id)).data
  if (content) {
    report.value = JSON.parse(content)
    showReport.value = true
  }
}
</script>

<template>
  <PageContainer>
    <a-card>
      <a-button type="primary" @click="showModal = true">
        新建清洗任务
      </a-button>
      <a-divider />
      <a-table
        :columns="DataCleanTaskColumn"
        :loading="loading"
        :data-source="data"
      >
        <template #bodyCell="{ record, column }">
          <template v-if="column.dataIndex === 'action'">
            <a @click="handlePreViewLog(record.id)">日志</a>
          </template>
          <template v-if="column.dataIndex === 'methods'">
            <div style="width: 150px;text-overflow: ellipsis; overflow: hidden;white-space: nowrap;">
              <a-tooltip :title="record.methods.split(' ').map((method: string) => DataCleanMethods[parseInt(method)]).join(', ')">
                <a-tag v-for="(method, index) in record.methods.split(' ')" :key="index">
                  {{ DataCleanMethods[parseInt(method)] }}
                </a-tag>
              </a-tooltip>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>
    <PreviewReportModal v-model:show="showReport" :report="report" />
    <CreateDataCleanTaskModal v-model:show="showModal" />
  </PageContainer>
</template>

<style lang="less" scoped>

</style>
