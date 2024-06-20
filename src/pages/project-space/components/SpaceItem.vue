<script lang="ts" setup>
import { EllipsisOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { ProjectSpaceCard } from '~@/types/constant'

defineProps({
  data: {
    type: Object as PropType<ProjectSpaceCard>,
    required: true,
  },
})
</script>

<template>
  <div class="container">
    <div class="card-head">
      <div class="card-title">
        {{ data.name }}
      </div>
      <div class="card-action">
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                进入项目空间
              </a-menu-item>
              <a-menu-item>
                编辑
              </a-menu-item>
              <a-menu-item>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <EllipsisOutlined />
        </a-dropdown>
      </div>
    </div>
    <div class="card-details">
      <div class="card-details-item">
        <div class="card-details-item-title">
          已授权用户
        </div>
        <div class="card-details-item-value">
          {{ data.totalUsers }}
        </div>
      </div>
    </div>
    <a-divider style="margin-top: 15px;margin-bottom: 15px;" />
    <div class="card-footer">
      <div class="card-owner">
        <div class="card-owner-icon">
          <UserOutlined />
        </div>
        <div class="card-owner-username">
          {{ data.owner }}
        </div>
      </div>
      <div class="card-creat-time">
        {{ data.createTime }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container{
  background-image: url('@/assets/images/space-stand.png');
  width: 100%;
  background-repeat: no-repeat;
  background-size: 100% 159px;
  border: none;
  overflow: hidden;
  font-size: 14px;
  border-radius: 6px;
  height: 159px;
  position: relative;
  cursor: pointer;
  padding-top: 24px;
  padding-bottom: 24px;
  .card-head{
    display: flex;
    justify-content: space-between;
    padding: 12px;
  }
  .card-action:hover{
    color: #1677ff;
  }
  .card-details{
    display: flex;
    justify-content: space-between;
    padding: 12px;
    padding-top: 0;
    padding-bottom: 0;
    .card-details-item{
      display: flex;
      font-size: 12px;
      .card-details-item-title{
        color: #84868C;
      }
      .card-details-item-title::after{
        content: "：";
      }
    }
  }
  .card-footer{
    display: flex;
    justify-content: space-between;
    padding: 12px;
    padding-top: 0;
    margin-bottom: 0;
    .card-owner{
      display: flex;
      justify-content: space-between;
      .card-owner-icon{
        margin-right: 10px;
        color: #84868C;
      }
    }
    .card-creat-time{
      color: #84868C;
    }
  }
}
.container:hover{
  background-image: url('@/assets/images/space-hover.png');
}
</style>
