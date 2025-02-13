<script lang="ts" setup>
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined, FullscreenOutlined, PlusOutlined, SaveOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'
import { message } from 'ant-design-vue'
import type { ImageType, LabelPlaygroundData } from '~@/types/structure'
import { getLabelPlaygroundApi, uploadLabelingDataApi } from '~@/api/labeling/playground'
import Bus from '~@/utils/bus'
import { fullWindow, pickeFromObject2Array } from '~@/utils/tools'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: Object as PropType<ImageType>,
    required: true,
  },
})
const config = useConfigStore()
const router = useRouter()
const buffer = useBufferStore()
const dsid = computed(() => props.id)
const type = computed(() => props.type)
const data = ref<LabelPlaygroundData<'classification'> | LabelPlaygroundData<'detection'>>({
  capacity: 0,
  items: [],
})
const formState = ref({
  current: 0,
  offset: 0,
  image: {
    id: -1,
    url: '',
    height: 0,
    width: 0,
  },
})
const left = computed(() => formState.value.offset * 10)
const right = computed(() => Math.min(formState.value.offset * 10 + 9, data.value.capacity))
onMounted(() => {
  loadData()
})
function handleFullScreen() {
  fullWindow('labeling-pg')
}
function handleNext() {
  if (formState.value.current === data.value.capacity - 1) {
    message.info('这是最后一张')
  }
  else {
    formState.value.current++
    config.set('curID', config.get('curID') + 1)
    jump()
  }
}
function handlePrev() {
  if (formState.value.current === 0) {
    message.info('这是第一张')
  }
  else {
    formState.value.current--
    config.set('curID', config.get('curID') - 1)
    jump()
  }
}
async function handleSave() {
  if (type.value === 'classification' && buffer.currentData) {
    await uploadLabelingDataApi(dsid.value, formState.value.image.id, {
      id: buffer.currentData.id,
      did: data.value.items[formState.value.current - formState.value.offset * 10].image.id,
    })
  }
}
function update() {
  Bus.emit('on-update', toRaw(formState.value.image), type.value)
}
async function loadData() {
  if (dsid.value === -1) {
    message.info('请选择一个数据集并标注')
    router.push('/data-manage/dataset')
    return
  }
  const d = (await getLabelPlaygroundApi(dsid.value, type.value, formState.value.offset * 10)).data
  if (d) {
    data.value = d
    jump()
    buffer.initBuffer(pickeFromObject2Array(d.items, 'annotation'))
  }
}
function jump() {
  // Bus.emit('on-labels-switch', formState.value.current - formState.value.offset * 10)
  buffer.setCurrentData(formState.value.current - formState.value.offset * 10)
  if (left.value > formState.value.current) {
    formState.value.offset--
    loadData()
  }
  if (right.value < formState.value.current) {
    formState.value.offset++
    loadData()
  }
  formState.value.image = {
    id: data.value.items[formState.value.current - formState.value.offset * 10].image.id,
    url: data.value.items[formState.value.current - formState.value.offset * 10].image.thumbnail,
    height: 500,
    width: 500,
  }
  update()
}
Bus.on('on-right-press', handleNext)
Bus.on('on-left-press', handlePrev)
Bus.on('on-save-press', handleSave)
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="toolbar">
        <a-space>
          <a-tooltip title="自动标注">
            <a-button type="text" :icon="h(SettingOutlined)" size="small" />
          </a-tooltip>
          <a-tooltip title="删除">
            <a-button type="text" :icon="h(DeleteOutlined)" size="small" />
          </a-tooltip>
          <a-divider type="vertical" />
          <a-tooltip title="全屏">
            <a-button type="text" :icon="h(FullscreenOutlined)" size="small" @click="handleFullScreen" />
          </a-tooltip>
        </a-space>
      </div>
      <div>
        <a-tooltip title="上一张">
          <a-button type="text" :icon="h(ArrowLeftOutlined)" size="small" @click="handlePrev" />
        </a-tooltip>
        第 {{ formState.current + 1 }} 张 / 共 {{ data.capacity }} 张
        <a-tooltip title="下一张">
          <a-button type="text" :icon="h(ArrowRightOutlined)" size="small" @click="handleNext" />
        </a-tooltip>
      </div>
      <a-button type="link" ghost size="small" @click="handleSave">
        <SaveOutlined />保存当前标注
      </a-button>
      {{ buffer.setting.annotationBuffer }}
    </div>
    <div class="canvas">
      <SvgLabelling class="pg" />
    </div>
    <div class="footerbar">
      <a-button shape="circle" :icon="h(ArrowLeftOutlined)" size="large" />
      <div class="image-list">
        <a-space>
          <div class="image-unit fix">
            <a>
              标注示例
            </a>
          </div>
          <div class="image-unit">
            21
          </div>
          <div class="image-unit fix">
            <a>
              <PlusOutlined />
            </a>
          </div>
        </a-space>
      </div>
      <a-button shape="circle" :icon="h(ArrowRightOutlined)" size="large" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.pg{
  width: 100%;
}
.header{
  display: flex;
  justify-content: space-between;
}
.canvas{
  margin-top: 10px;
  height: 500px;
}
.footerbar{
  margin-top: 10px;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .image-list{
    width: 80%;
    .image-unit{
      border: 1px solid #ddd;
      width: 70px;
      height: 100px;
      border-radius: 5px;
      box-shadow: none;
      cursor: pointer;
      transition: box-shadow 0.3s;
    }
    .image-unit:hover{
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      transition: box-shadow 0.3s;
    }
    .fix{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
