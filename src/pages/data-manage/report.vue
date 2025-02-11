<script lang="ts" setup>
import { getAnaReport } from '~@/api/data-manage/dataset'
import { createLineChart, createPieChart } from '~@/utils/chart'
import { changeChartData2G2PlotData, changePieData2G2PlotData } from '~@/utils/tools'

const route = useRoute()
const id = route.query.id

const spinning = ref(true)

const mode_plot = ref()
const mode_resolution = ref()
const mode_aspectratio = ref()
const mode_calarity = ref()
const mode_colorcast = ref()

onMounted(async () => {
  const report_ = (await getAnaReport(id)).data
  if (report_) {
    createPieChart(mode_plot.value, changePieData2G2PlotData(report_.entityMode))
    createLineChart(mode_resolution.value, changeChartData2G2PlotData(report_.entityResolution))
    createLineChart(mode_aspectratio.value, changeChartData2G2PlotData(report_.entityAspectRatio))
    createLineChart(mode_calarity.value, changeChartData2G2PlotData(report_.entityClarity))
    createLineChart(mode_colorcast.value, changeChartData2G2PlotData(report_.entityColorCast))
    spinning.value = false
  }
})
</script>

<template>
  <PageContainer>
    <a-spin size="large" :spinning="spinning" tip="正在加载数据集分析报告">
      <a-card>
        <a-row :gutter="6">
          <a-col :span="8">
            <div ref="mode_plot" class="mode_plot" />
          </a-col>
          <a-col :span="8">
            <div ref="mode_resolution" class="mode_resolution" />
          </a-col>
          <a-col :span="8">
            <div ref="mode_aspectratio" class="mode_aspectratio" />
          </a-col>
        </a-row>
        <a-row :gutter="6">
          <a-col :span="12">
            <div ref="mode_calarity" class="mode_calarity" />
          </a-col>
          <a-col :span="12">
            <div ref="mode_colorcast" class="mode_colorcast" />
          </a-col>
        </a-row>
      </a-card>
    </a-spin>
  </PageContainer>
</template>

<style lang="less" scoped>

</style>
