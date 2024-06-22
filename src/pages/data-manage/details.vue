<script lang="ts" setup>
import { DownOutlined, SwapOutlined } from '@ant-design/icons-vue'
import LabelUnit from './components/LabelUnit.vue'
import LabelImage from './components/LabelImage.vue'

const activeKey = ref('1')
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
                <LabelUnit v-for="(_, index) in [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]" :key="index" label="11" color="pink" />
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
              <LabelImage v-for="(_, index) in [0, 0, 0, 0, 0, 0, 0, 0, 0]" :key="index" :checked="false" image-meta="1" label="111" thumbnail="https://ts2.cn.mm.bing.net/th?id=OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
            </a-flex>
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
