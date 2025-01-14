<script lang="ts" setup>
import { DeleteOutlined, EllipsisOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { DatasetFormState } from '~@/types/form'
import { DatasetColumn } from '~@/types/columns'
import { DataSetImportStatusMap, sourceStaticSelectData, typeStaticSelectData } from '~@/types/static'
import { getDataSetApi } from '~@/api/data-manage/dataset'
import { findLabelByValue } from '~@/utils/tools'
import type { DatasetInfo } from '~@/types/structure'

const formState = ref<DatasetFormState>({
  type: [],
  source: 0,
  content: '',
})
const loading = ref(true)
const testDataSet = ref<DatasetInfo[]>([])
const router = useRouter()
function handleCreateDataSet() {
  router.push({
    path: '/data-manage/create',
  })
}
function handlePreviewDSDetails(id: number) {
  router.push({
    path: '/data-manage/details',
    query: {
      id,
    },
  })
}
async function handleDataSetInfoView() {
  const data = await getDataSetApi(1)
  if (data.data) {
    testDataSet.value = data.data
    loading.value = false
  }
}
onMounted(() => handleDataSetInfoView())
</script>

<template>
  <PageContainer>
    <template #content>
      平台支持统一纳管自训练模型的数据集，并支持数据查看、导入导出和删除等操作。
    </template>
    <a-card>
      <a-form :model="formState">
        <div class="form">
          <div class="btn">
            <a-form-item>
              <a-button type="primary" @click="handleCreateDataSet()">
                <template #icon>
                  <PlusOutlined />
                </template>
                创建数据集
              </a-button>
            </a-form-item>
          </div>
          <div class="right-query">
            <a-space>
              <a-form-item name="source">
                <a-select v-model:value="formState.source" class="form-item" :options="sourceStaticSelectData" />
              </a-form-item>
              <a-form-item name="type">
                <a-cascader v-model:value="formState.type" class="form-item" placeholder="全部" :options="typeStaticSelectData" />
              </a-form-item>
              <a-form-item name="content">
                <a-input-search v-model:value="formState.content" class="form-item" placeholder="输入数据集名称或数据集ID" />
              </a-form-item>
            </a-space>
          </div>
        </div>
      </a-form>
      <div class="table-list">
        <div v-for="(item, index) in testDataSet" :key="index" class="table-item">
          <a-table :loading="loading" :columns="DatasetColumn" :data-source="[item]" :pagination="false" :style="{ marginBottom: index < testDataSet.length - 1 ? '10px' : '0' }">
            <template #title>
              <div class="info-header">
                <div class="info-left">
                  <a-space>
                    <div class="info-title">
                      {{ item.name }}
                    </div>
                    <div class="groupid">
                      <div class="form-item-title">
                        数据集组ID
                      </div>
                      {{ item.groupID }}
                    </div>
                  </a-space>
                </div>
                <div class="info-right">
                  <a-space>
                    <a-button type="text" danger>
                      <DeleteOutlined />删除
                    </a-button>
                  </a-space>
                </div>
              </div>
            </template>
            <template #bodyCell="{ record, column }">
              <template v-if="column.dataIndex === 'version'">
                V{{ record.version }}
                <a-popover placement="right">
                  <template #content>
                    <div class="content">
                      <a-descriptions title="基本信息">
                        <a-descriptions-item label="数据集名称" :span="1">
                          {{ item.name }}
                        </a-descriptions-item>
                        <a-descriptions-item label="数据集ID" :span="2">
                          {{ item.id }}
                        </a-descriptions-item>
                        <a-descriptions-item label="版本号" :span="1">
                          V{{ item.version }}
                        </a-descriptions-item>
                        <a-descriptions-item label="创建时间" :span="2">
                          {{ item.createTime }}
                        </a-descriptions-item>
                      </a-descriptions>
                      <a-descriptions title="标注信息">
                        <a-descriptions-item label="标注类型" :span="1">
                          {{ findLabelByValue(typeStaticSelectData, item.type) }}
                        </a-descriptions-item>
                        <a-descriptions-item label="标注模板" :span="2">
                          {{ item.type }}
                        </a-descriptions-item>
                        <a-descriptions-item label="数据总量" :span="1">
                          {{ item.capacity }}
                        </a-descriptions-item>
                        <a-descriptions-item label="已标注" :span="2">
                          {{ item.labelingStatus }} (进度 {{ Math.ceil((record.labelingStatus / record.capacity) * 100) }}%)
                        </a-descriptions-item>
                        <a-descriptions-item label="标签个数" :span="1">
                          {{ item.totalLabels }}
                        </a-descriptions-item>
                        <a-descriptions-item label="大小" :span="2">
                          {{ item.size }}M
                        </a-descriptions-item>
                      </a-descriptions>
                      <a-descriptions title="数据清洗">
                        <template #extra>
                          暂未做过数据清洗任务
                        </template>
                      </a-descriptions>
                      <a-descriptions title="数据增强">
                        <template #extra>
                          暂未做过数据增强任务
                        </template>
                      </a-descriptions>
                      <a-descriptions title="数据合成">
                        <template #extra>
                          暂未做过数据合成任务
                        </template>
                      </a-descriptions>
                      <a-descriptions title="数据仿真">
                        <template #extra>
                          暂未做过数据仿真任务
                        </template>
                      </a-descriptions>
                    </div>
                  </template>
                  <InfoCircleOutlined />
                </a-popover>
              </template>
              <template v-if="column.dataIndex === 'type'">
                {{ findLabelByValue(typeStaticSelectData, item.type) }}
              </template>
              <template v-if="column.dataIndex === 'importStatus'">
                <a-badge status="success" :text="DataSetImportStatusMap.get(record.importStatus)" />
              </template>
              <template v-if="column.dataIndex === 'labelStatus'">
                {{ Math.ceil((record.labelStatus / record.capacity) * 100) }}%  ({{ record.labelStatus }}/{{ record.capacity }})
              </template>
              <template v-if="column.dataIndex === 'action'">
                <a-space>
                  <a-button type="link" size="small" @click="handlePreviewDSDetails(record.id)">
                    查看
                  </a-button>
                  <a-button type="link" size="small">
                    导入
                  </a-button>
                  <a-button type="link" size="small">
                    导出
                  </a-button>
                  <a-button type="link" size="small">
                    标注
                  </a-button>
                  <a-button type="link" size="small">
                    <a-dropdown>
                      <template #overlay>
                        <a-menu>
                          <a-menu-item>
                            清洗
                          </a-menu-item>
                          <a-menu-item>
                            质检报告
                          </a-menu-item>
                        </a-menu>
                      </template>
                      <EllipsisOutlined />
                    </a-dropdown>
                  </a-button>
                </a-space>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </a-card>
  </PageContainer>
</template>

<style lang="less" scoped>
.form{
  display: flex;
  justify-content: space-between;
}
.form-item{
  width: 200px;
}
:deep(.ant-table-title){
  background: #f7f7f7;
}
:deep(.ant-descriptions-item-label){
  color: #797b81;
}
.info-header{
  display: flex;
  justify-content: space-between;
  .info-title{
    font-weight: bold;
    width: 5rem;
    display: flex;
    margin-right: 10px;
  }
  .groupid{
    display: flex;
  }
}
.form-item-title::after{
  content: '：'
}
.content{
  width: 600px;
}
</style>
