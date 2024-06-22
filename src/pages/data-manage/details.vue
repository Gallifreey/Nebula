<script lang="ts" setup>
import { SwapOutlined } from '@ant-design/icons-vue'

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
              <a-button type="primary">
                添加标签
              </a-button>
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
          </div>
        </a-col>
        <a-col :span="16">
          2
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
  }
}
</style>
