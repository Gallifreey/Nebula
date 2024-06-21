<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import SpaceItem from './components/SpaceItem.vue'
import type { ProjectSpaceFormState } from '~@/types/form'
import type { ProjectSpaceCard } from '~@/types/constant'

const formState = ref<ProjectSpaceFormState>({
  name: '',
})
const current = ref(0)
const cardDataTest = reactive<ProjectSpaceCard[]>([
  {
    name: '垃圾分类',
    owner: 'Amadus',
    totalUsers: 12,
    createTime: '2024-08-03',
  },
  {
    name: '默认项目空间',
    owner: 'Default',
    totalUsers: 0,
    createTime: '2024-08-03',
  },
])
const paginationTotalNumber = computed(() => {
  return cardDataTest.length
})
const router = useRouter()
function handleCreateProjectSpace() {
  router.push({
    path: '/project-space/create',
  })
}
</script>

<template>
  <div class="container">
    <PageContainer>
      <template #content>
        <div class="descrption">
          项目是您工作的容器，用以管理项目中的资源、人员、权限，并围绕项目中的各类任务日常运维。你可以选择一个已有项目，使用项目中已分配的权限及资源，快速启动任务或接力任务流水线。
        </div>
        <a-form name="form" :model="formState">
          <div class="form-item">
            <a-form-item>
              <a-button type="primary" @click="handleCreateProjectSpace()">
                <template #icon>
                  <PlusOutlined />
                </template>
                创建项目空间
              </a-button>
            </a-form-item>
            <a-form-item name="name">
              <a-input v-model:value="formState.name" placeholder="请输入项目空间名称" style="width: 200px;" />
            </a-form-item>
          </div>
        </a-form>
        <a-divider />
        <div class="space">
          <a-space size="large">
            <SpaceItem v-for="(item, index) in cardDataTest" :key="index" style="width: 300px;" :data="item" />
          </a-space>
        </div>
        <a-pagination v-model:current="current" class="pagination" :total="paginationTotalNumber" />
      </template>
    </PageContainer>
  </div>
</template>

<style lang="less" scoped>
.descrption{
  font-size: 13px;
  color: #84868C;
  line-height: 20px;
  font-weight: 400;
  margin-top: 8px;
  padding-bottom: 16px;
}
.form-item{
  display: flex;
  justify-content: space-between;
}
.pagination{
  margin-top: 24px;
  text-align: right;
}
</style>
