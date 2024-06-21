<script lang="ts" setup>
import { AppstoreOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, InfoCircleOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons-vue'
import type { CascaderProps, SelectProps } from 'ant-design-vue'
import type { DatasetFormState } from '~@/types/form'
import { DatasetColumn } from '~@/types/columns'
import { DataSetImportStatusMap } from '~@/types/static'

const formState = ref<DatasetFormState>({
  type: [],
  source: 0,
  content: '',
})
const sourceStaticSelectData: SelectProps['options'] = [
  {
    value: 0,
    label: '我的数据集',
  },
  {
    value: 1,
    label: '公开数据集',
  },
]
const typeStaticSelectData: CascaderProps['options'] = [
  {
    value: 0,
    label: '图片',
    children: [
      {
        value: 1,
        label: '图片分类',
      },
      {
        value: 2,
        label: '物体检测',
      },
      {
        value: 3,
        label: '语义分割',
      },
      {
        value: 4,
        label: '3D框标注',
      },
      {
        value: 5,
        label: '关键点检测',
      },
    ],
  },
  {
    value: 10,
    label: '视频',
    children: [
      {
        value: 11,
        label: '视频检测',
      },
      {
        value: 12,
        label: '目标跟踪',
      },
    ],
  },
  {
    value: 20,
    label: '点云',
    children: [
      {
        value: 21,
        label: '点云分割',
      },
      {
        value: 22,
        label: '点云重建',
      },
      {
        value: 23,
        label: '点云混合标注',
      },
    ],
  },
]

const testDataSet = [
  {
    version: 1,
    id: 212233,
    capacity: 95,
    importStatus: 0,
    type: 0,
    labelStatus: 50,
    name: '垃圾分类',
    groupID: 12345,
  },
]
</script>

<template>
  <PageContainer>
    <template #content>
      平台支持统一纳管自训练模型的数据集，并支持自主版本迭代、数据查看、导入导出和删除等操作。
    </template>
    <a-card>
      <a-form :model="formState">
        <div class="form">
          <div class="btn">
            <a-form-item>
              <a-button type="primary">
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
        <a-table :columns="DatasetColumn" :data-source="testDataSet">
          <template #title>
            <div class="info-header">
              <div class="info-left">
                <a-space>
                  <div class="info-title">
                    {{ testDataSet[0].name }}
                    <a><EditOutlined /></a>
                  </div>
                  <div class="groupid">
                    <div class="form-item-title">
                      数据集组ID
                    </div>
                    {{ testDataSet[0].groupID }}
                  </div>
                </a-space>
              </div>
              <div class="info-right">
                <a-space>
                  <a-button type="text">
                    <PlusSquareOutlined />新增版本
                  </a-button>
                  <a-button type="text">
                    <AppstoreOutlined />全部版本
                  </a-button>
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
              <InfoCircleOutlined />
            </template>
            <template v-if="column.dataIndex === 'importStatus'">
              <a-badge status="success" :text="DataSetImportStatusMap.get(record.importStatus)" />
            </template>
            <template v-if="column.dataIndex === 'labelStatus'">
              {{ Math.ceil((record.labelStatus / record.capacity) * 100) }}%  ({{ record.labelStatus }}/{{ record.capacity }})
            </template>
            <template v-if="column.dataIndex === 'action'">
              <a-space>
                <a-button type="link" size="small">
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
                          删除
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
::v-deep .ant-table-title{
  background: #f7f7f7;
}
.info-header{
  display: flex;
  justify-content: space-between;
  .info-title{
    margin-right: 10px;
  }
  .groupid{
    display: flex;
  }
}
.form-item-title::after{
  content: '：'
}
</style>
