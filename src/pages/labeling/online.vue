<script lang="ts" setup>
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined, DownOutlined, EditOutlined, FullscreenOutlined, MinusCircleOutlined, PlusCircleOutlined, PlusOutlined, RedoOutlined, SaveOutlined, SettingOutlined, UndoOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'
import LabelUnit from './components/LabelUnit.vue'
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
    <a-card>
      <a-row :gutter="20">
        <a-col :span="18">
          <div class="header">
            <div class="toolbar">
              <a-space>
                <a-button type="text" :icon="h(EditOutlined)" size="small" />
                <a-button type="text" :icon="h(UndoOutlined)" size="small" />
                <a-button type="text" :icon="h(RedoOutlined)" size="small" />
                <a-divider type="vertical" />
                <a-button type="text" :icon="h(PlusCircleOutlined)" size="small" />
                <a-button type="text" :icon="h(MinusCircleOutlined)" size="small" />
                <a-button type="text" :icon="h(SettingOutlined)" size="small" />
                <a-button type="text" :icon="h(DeleteOutlined)" size="small" />
                <a-divider type="vertical" />
                <a-button type="text" :icon="h(FullscreenOutlined)" size="small" />
              </a-space>
            </div>
            <div class="navbar">
              <a-space>
                <div>
                  <a-button type="text" :icon="h(ArrowLeftOutlined)" size="small" />
                  第 1 张 / 共 1111 张
                  <a-button type="text" :icon="h(ArrowRightOutlined)" size="small" />
                </div>
                <a-checkbox>标为无效数据 (W)</a-checkbox>
                <a-button type="link" ghost size="small">
                  <SaveOutlined />保存当前标注
                </a-button>
              </a-space>
            </div>
          </div>
          <div class="canvas">
            1
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
                <LabelUnit v-for="(_, index) in [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]" :key="index" label="11" color="pink">
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
}
.canvas{
  margin-top: 10px;
  height: 500px;
  border: 1px solid #ddd;
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
