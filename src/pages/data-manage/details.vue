<script lang="ts" setup>
import { SwapOutlined } from '@ant-design/icons-vue'
import LabelUnit from './components/LabelUnit.vue'
import LabelImage from './components/LabelImage.vue'
import { addNewLabelApi, getDataSetImageDetailsApi, getDataSetLabelDetailsApi } from '~@/api/data-manage/dataset'
import type { LabelCreateFormState } from '~@/types/form'
import { RESPONSE_CODE } from '~@/types/static'
import type { ImageDataShortDetails } from '~@/types/structure'

const router = useRoute()
const id = router.query.id
let dsid = -1
if (typeof id === 'string') {
  dsid = Number.parseInt(id, 10)
  if (Number.isNaN(dsid))
    console.error('Invalid id: id is not a valid number')
}
else {
  console.error('Invalid id: id is not a string')
}

const open = ref(false)
const activeKey = ref('1')
const images = ref<ImageDataShortDetails['images']>([])
const labels = ref<ImageDataShortDetails['labels']>([])

const capacity = ref(0)
const offset = ref(0)
const preview = ref(20)

const formRef = ref()
const formState = ref<LabelCreateFormState>({
  name: `label ${Math.floor(Math.random() * 10000).toString()}`,
  color: 'white',
  id: dsid,
})
async function handleDataSetDetailsView(cancleLabel: boolean = false) {
  const data = (await getDataSetImageDetailsApi(dsid, preview.value, offset.value)).data
  if (data) {
    images.value = data.images
    capacity.value = data.capacity || 0
  }
  if (!cancleLabel) {
    const data = (await getDataSetLabelDetailsApi(dsid)).data
    if (data)
      labels.value = data
  }
}
function openModal() {
  open.value = true
}
function closeModal() {
  open.value = false
  formState.value = {
    name: `label ${Math.floor(Math.random() * 10000).toString()}`,
    color: 'white',
    id: dsid,
  }
}
function handleAddNewLabel() {
  formRef.value.validate().then(async () => {
    const code = (await addNewLabelApi(formState.value)).code
    if (code === RESPONSE_CODE.OK)
      open.value = false
  }).catch(() => {})
}
function pageChange(pageNumber: number) {
  offset.value = (pageNumber - 1) * preview.value
  handleDataSetDetailsView(true)
}
function sizeChange(_current: number, pageSize: number) {
  preview.value = pageSize
  handleDataSetDetailsView(true)
}
onMounted(() => handleDataSetDetailsView())
</script>

<template>
  <PageContainer>
    <template #extra>
      <a-space :gap="20">
        <a-button>
          导入数据
        </a-button>
        <a-button>
          质检报告
        </a-button>
        <a-button>
          数据标注
        </a-button>
      </a-space>
    </template>
    <template #content>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="全部" />
        <a-tab-pane key="2" tab="有标注信息" />
        <a-tab-pane key="3" tab="无标注信息" />
      </a-tabs>
    </template>
    <a-card>
      <a-row :gutter="20">
        <a-col :span="8">
          <div class="header">
            <div class="title">
              标签栏
            </div>
            <div class="btn">
              <a-space-compact block>
                <a-button type="primary" @click="openModal">
                  添加标签
                </a-button>
              </a-space-compact>
            </div>
          </div>
          <div class="search">
            <a-input-search placeholder="请输入标签名称" />
          </div>
          <div class="labels">
            <div class="label-header">
              <div class="label-header-left">
                标签名
              </div>
              <div class="label-header-right">
                标注框数
                <SwapOutlined />
              </div>
            </div>
            <div class="label-body">
              <div class="label-unit">
                <LabelUnit v-for="(label, index) in labels" :key="index" :meta="label" />
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="16">
          <div class="header">
            <a-space>
              <a-button danger>
                删除
              </a-button>
            </a-space>
          </div>
          <div class="label-image-container">
            <a-flex wrap="wrap" gap="small">
              <LabelImage v-for="(image, index) in images" :key="index" :pid="image.id" :checked="false" :name="image.name" :thumbnail="image.thumbnail" />
            </a-flex>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-modal v-model:open="open" title="添加新标签" :keyboard="false" :mask-closable="false" :destroy-on-close="true" :closable="false" @ok="handleAddNewLabel" @cancel="closeModal">
      <a-form
        ref="formRef"
        :model="formState"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-form-item
          name="name" label="标签名称" :rules="[{
            required: true,
            message: '请输入标签名称',
          }]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item name="name" label="标签颜色">
          <a-input v-model:value="formState.color" type="color" style="width: 40px" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-pagination v-model:current="offset" v-model:pageSize="preview" :total="capacity" @change="pageChange" @show-size-change="sizeChange" />
  </PageContainer>
</template>

<style lang="less" scoped>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title{
    font-size: 20px;
  }
  margin-bottom: 10px;
}
.search{
  height: 100px;
  display: flex;
  align-items: center;
}
.labels{
  .label-header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .label-unit{
    max-height: 300px;
    overflow-y: auto;
  }
}
</style>
