<script lang="ts" setup>
import LabelTypeCard from './components/LabelTypeCard.vue'
import type { DatasetCreateFormState } from '~@/types/form'

const stepItems = [
  {
    title: '创建数据集',
  },
  {
    title: '导入数据',
  },
]
const current = ref(1)
const currentSelected = ref(0)
const formState = ref<DatasetCreateFormState>({
  name: '',
  dataType: 0,
  labelType: 0,
  version: 1,
  template: 0,
})
const labelStaticData = [
  {
    label: '已',
    url: 'https://console.bce.baidu.com/easydata/app/datav/img/IMG_CLS.ab2120c7.png',
  },
  {
    label: '已',
    url: 'https://console.bce.baidu.com/easydata/app/datav/img/IMG_CLS.ab2120c7.png',
  },
  {
    label: '已',
    url: 'https://console.bce.baidu.com/easydata/app/datav/img/IMG_CLS.ab2120c7.png',
  },
  {
    label: '已',
    url: 'https://console.bce.baidu.com/easydata/app/datav/img/IMG_CLS.ab2120c7.png',
  },
  {
    label: '已',
    url: 'https://console.bce.baidu.com/easydata/app/datav/img/IMG_CLS.ab2120c7.png',
  },
]
</script>

<template>
  <PageContainer>
    <a-steps :items="stepItems" class="steps" :current="current" />
    <a-card :title="stepItems[current].title">
      <template v-if="current === 0">
        <a-form
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
              <a-radio-button :value="1">
                视频
              </a-radio-button>
              <a-radio-button :value="2">
                点云
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item name="version" label="数据集版本">
            V{{ formState.version }}
          </a-form-item>
          <a-form-item name="labelType" label="标注类型">
            <a-flex :gap="10" wrap="wrap">
              <LabelTypeCard v-for="(item, index) in labelStaticData" :key="index" :label="item.label" :url="item.url" :selected="currentSelected === index" @click="currentSelected = index" />
            </a-flex>
          </a-form-item>
          <a-form-item name="template" label="标注模板">
            <a-radio-group v-model:value="formState.template">
              <a-radio :value="0">
                单图单标签
              </a-radio>
              <a-radio :value="1">
                单图多标签
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </template>
      <template v-if="current === 1">
        1
      </template>
    </a-card>
  </PageContainer>
</template>

<style lang="less" scoped>
.steps{
  padding-left: 20%;
  padding-right: 20%;
  margin-bottom: 24px;
}
</style>
