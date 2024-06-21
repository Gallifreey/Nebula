<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form'
import UserAuthDrawer from './components/UserAuthDrawer.vue'
import type { ProjectSpace } from '~@/types/constant'
import { generateUUID } from '~@/utils/tools'
import { ProjectSpaceAuthColumn } from '~@/types/columns'

const stepItems = [
  {
    title: '基本信息',
  },
  {
    title: '用户授权',
  },
]
const current = ref(1)
const formState = ref<ProjectSpace>({
  name: '',
  description: '',
  uuid: generateUUID(),
  users: [],
})
const rules: Record<string, Rule[]> = {
  name: [
    { required: true, message: '请输入项目空间名称', trigger: 'change' },
  ],
  uuid: [
    { required: true, message: '请输入项目空间ID', trigger: 'change' },
  ],
}
const staticTableData = ref([
  {
    role: '项目管理员',
    description: '拥有授权项目下数据、训练、部署等平台功能权限及项目管理角色授权权限',
    authTotal: 0,
  },
  {
    role: '开发者',
    description: '拥有授权项目下数据，训练，部署等平台功能权限',
    authTotal: 0,
  },
  {
    role: '标注成员',
    description: '拥有授权项目下多人标注任务接收的权限',
    authTotal: 0,
  },
])
const roleModalVisible = ref(false)
const userDrawerVisible = ref(false)
</script>

<template>
  <div class="container">
    <PageContainer>
      <template #content>
        <a-steps :items="stepItems" :current="current" size="default" class="steps" />
        <template v-if="current === 0">
          <a-alert message="项目空间是区域下为了完成同一AI目标而进行的团队协作任务的（数据处理-模型训练-模型管理-模型服务）集合；可按工作范围或目标划分；计算资源通过分配方式授权项目使用，企业/团队成员以某种角色加入到项目中。" type="info" show-icon />
          <a-divider />
          <a-form
            :model="formState"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 8 }"
            :rules="rules"
          >
            <a-form-item label="项目空间名称" name="name">
              <a-input v-model:value="formState.name" show-count :maxlength="50" />
            </a-form-item>
            <a-form-item label="项目空间ID" name="uuid">
              <a-input v-model:value="formState.uuid" disabled />
            </a-form-item>
            <a-form-item label="项目空间描述" name="description">
              <a-textarea v-model:value="formState.description" placeholder="请输入项目空间描述" show-count :maxlength="200" />
            </a-form-item>
          </a-form>
        </template>
        <template v-if="current === 1">
          <a-alert show-icon>
            <template #message>
              为项目空间授权用户，已授权的用户可以在项目空间中使用服务。当前仅展示具有项目操作的角色，具体角色权限请参考
              <a-button type="link" size="small" @click="roleModalVisible = true">
                角色权限对照表
              </a-button>
            </template>
          </a-alert>
          <a-divider />
          <a-table :columns="ProjectSpaceAuthColumn" :data-source="staticTableData">
            <template #bodyCell="{ column }">
              <template v-if="column.dataIndex === 'action'">
                <a-button type="link" size="small" @click="userDrawerVisible = true">
                  用户授权
                </a-button>
              </template>
            </template>
          </a-table>
        </template>
      </template>
    </PageContainer>
    <a-modal v-model:open="roleModalVisible" title="查看角色权限对照表" :mask-closable="false">
      1
    </a-modal>
    <UserAuthDrawer v-model:open="userDrawerVisible" />
  </div>
</template>

<style lang="less" scoped>
.container {
  position: relative;
}
.steps{
  padding-left: 20%;
  padding-right: 20%;
  margin-bottom: 24px;
}
.footer{
  position: absolute;
  bottom: 0;
  width: 100%;
  background: white;
}
</style>
