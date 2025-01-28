<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue'
import Playground from './components/Playground.vue'
import LabelUnit from './components/LabelUnit.vue'
import type { Label } from '~@/types/structure'
import { getLabelsApi } from '~@/api/labeling/playground'
import Bus from '~@/utils/bus'

const route = useRoute()
const id = route.query.id
const type = route.query.type
const labels = ref<Label[]>([])
const config = useConfigStore()
let dsid = -1
if (typeof id === 'string') {
  dsid = Number.parseInt(id, 10)
  if (Number.isNaN(dsid))
    console.error('Invalid id: id is not a valid number')
}
else {
  console.error('Invalid id: id is not a string')
}
onMounted(async () => {
  if (dsid !== -1) {
    const d = (await getLabelsApi(dsid)).data
    if (d) {
      labels.value = d
      Bus.emit('on-labels-update', d)
      config.set('contextMenuTitleType', type)
    }
  }
})
</script>

<template>
  <PageContainer>
    <template #extra>
      <a-space>
        <a-button>
          自动标注
        </a-button>
        <a-button>
          数据合成
        </a-button>
        <a-button>
          数据仿真
        </a-button>
      </a-space>
    </template>
    <a-card id="labeling-pg">
      <a-row :gutter="20">
        <a-col :span="18">
          <Playground :id="dsid" :type="type" />
        </a-col>
        <a-col :span="6">
          <div class="header">
            <div class="title">
              标签栏
            </div>
            <div class="btn">
              <a-space-compact block>
                <a-button type="primary">
                  添加标签
                </a-button>
                <a-button type="primary">
                  <DownOutlined />
                </a-button>
              </a-space-compact>
            </div>
          </div>
          <div class="search">
            <a-input-search placeholder="请输入标签名称" />
          </div>
          <div class="labels">
            <div class="label-body">
              <div class="label-unit">
                <LabelUnit v-for="(label, index) in labels" :key="index" :label="label.name" :color="label.color">
                  <template #suffix>
                    <span style="margin-right: 5px">快捷键</span>
                    <a-avatar shape="square" size="small">
                      <template #icon>
                        {{ index + 1 }}
                      </template>
                    </a-avatar>
                  </template>
                </LabelUnit>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>
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
  .label-unit{
    max-height: 400px;
    overflow-y: auto;
  }
}
</style>
