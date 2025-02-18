<script lang="ts" setup>
import { UploadOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue'
import LabelTypeCard from './components/LabelTypeCard.vue'
import type { DatasetCreateFormState } from '~@/types/form'
import { RESPONSE_CODE, importTypeHasLabelStaticSelectData, importTypeStaticSelectData } from '~@/types/static'
import { dsCreateApi } from '~@/api/data-manage/dataset'

const stepItems = [
  {
    title: '创建数据集',
  },
  {
    title: '导入数据',
  },
]
const formRef1 = ref()
const formRef2 = ref()
const current = ref(0)
const router = useRouter()
const id = useUserID()
const formState = ref<DatasetCreateFormState>({
  name: '',
  dataType: 0,
  type: 0,
  version: 1,
  labelStatus: 0,
  importType: [0],
  dataFile: [],
  labelFile: [],
  classFile: [],
  oid: id.value || -1,
  spid: 1,
})
const labelStaticData = [
  {
    label: '图像分类',
    url: 'https://console.bce.baidu.com/easydata/app/datav/img/IMG_CLS.ab2120c7.png',
  },
  {
    label: '2D-box',
    url: 'https://console.bce.baidu.com/easydata/app/datav/img/IMG_CLS.ab2120c7.png',
  },
]
const beforeUpload: UploadProps['beforeUpload'] = () => {
  return false
}
function nextStep() {
  if (current.value === 0) {
    formRef1.value.validate().then(() => {
      current.value++
    }).catch(() => {})
  }
}
const prevStep = () => current.value--
async function handleCreate() {
  formRef2.value.validate().then(async () => {
    const code = (await dsCreateApi(formState.value)).code
    if (code === RESPONSE_CODE.OK) {
      router.push({
        path: '/data-manage/dataset',
      })
    }
  }).catch(() => {})
}
</script>

<template>
  <PageContainer>
    <a-steps :items="stepItems" class="steps" :current="current" />
    <a-card :title="stepItems[current].title">
      <template v-if="current === 0">
        <a-form
          ref="formRef1"
          :model="formState"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 20 }"
        >
          <a-form-item
            name="name" label="数据集名称" :rules="[{
              required: true,
              message: '请输入数据集名称',
            }]"
          >
            <a-input v-model:value="formState.name" placeholder="限制50个字符以内（支持汉字、大小写英文、数字以及下划线，下划线不能用为开头）" show-count :maxlength="50" />
          </a-form-item>
          <a-form-item name="dataType" label="数据类型">
            <a-radio-group v-model:value="formState.dataType">
              <a-radio-button :value="0">
                图像
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item name="version" label="数据集版本">
            V{{ formState.version }}
          </a-form-item>
          <a-form-item name="labelType" label="标注类型">
            <a-flex :gap="10" wrap="wrap">
              <LabelTypeCard v-for="(item, index) in labelStaticData" :key="index" :label="item.label" :url="item.url" :selected="formState.type === (index + 1)" @click="formState.type = (index + 1)" />
            </a-flex>
          </a-form-item>
        </a-form>
      </template>
      <template v-if="current === 1">
        <a-form
          ref="formRef2"
          :model="formState"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-form-item name="labelStatus" label="数据标注状态">
            <a-radio-group v-model:value="formState.labelStatus">
              <a-radio :value="0">
                无标注信息
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item name="importType" label="导入方式">
            <a-cascader v-model:value="formState.importType" :options="formState.labelStatus ? importTypeHasLabelStaticSelectData : importTypeStaticSelectData" :allow-clear="false" />
          </a-form-item>
          <a-form-item name="dataFile" label="上传数据">
            <a-upload
              v-model:file-list="formState.dataFile"
              :before-upload="beforeUpload"
              :headers="{ authorization: 'authorization-text' }"
              :max-count="1"
              accept=".zip"
            >
              <a-button type="primary">
                <UploadOutlined /> 上传
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item name="labelFile" label="上传标签">
            <a-upload
              v-model:file-list="formState.labelFile"
              :before-upload="beforeUpload"
              :headers="{ authorization: 'authorization-text' }"
              :max-count="1"
              accept=".zip"
            >
              <a-button type="primary">
                <UploadOutlined /> 上传
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item name="classFile" label="上传类型">
            <a-upload
              v-model:file-list="formState.classFile"
              :before-upload="beforeUpload"
              :headers="{ authorization: 'authorization-text' }"
              :max-count="1"
              accept=".txt"
            >
              <a-button type="primary">
                <UploadOutlined /> 上传
              </a-button>
            </a-upload>
          </a-form-item>
        </a-form>
      </template>
      <div class="bottom-btn-bar">
        <a-button v-show="current >= 1" type="primary" style="margin-right: 16px;" @click="prevStep">
          上一步
        </a-button>
        <a-button v-show="current < 1" type="primary" style="margin-right: 16px;" @click="nextStep">
          下一步
        </a-button>
        <a-button v-show="current === 1" @click="handleCreate">
          创建数据集
        </a-button>
      </div>
    </a-card>
  </PageContainer>
</template>

<style lang="less" scoped>
.steps{
  padding-left: 20%;
  padding-right: 20%;
  margin-bottom: 24px;
}
.bottom-btn-bar{
  text-align: center;
}
</style>
