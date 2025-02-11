import { Line, Pie } from '@antv/g2plot'
import type { RawChartData } from '~@/types/structure'

export function createPieChart(element: HTMLElement, data: RawChartData[]) {
  const piePlot = new Pie(element, {
    autoFit: true,
    radius: 0.8,
    data,
    angleField: 'value',
    colorField: 'label',
    label: {
      type: 'spider',
    },
  })
  piePlot.render()
  return piePlot
}

export function createLineChart(element: HTMLElement, data: RawChartData[]) {
  const linePlot = new Line(element, {
    autoFit: true,
    data,
    xField: 'label',
    yField: 'value',
    smooth: true,
  })
  linePlot.render()
  return linePlot
}
