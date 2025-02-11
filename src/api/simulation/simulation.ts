// dsid 数据集ID channel 频道ID
export function connectSimulationCamera(dsid: number, channel: number) {
  return usePost<null, {
    id: number
    channel: number
  }>('/simulation/stream', {
    id: dsid,
    channel,
  }, {
    type: 'carla',
    customDev: true,
  })
}

// dsid 数据集ID
export function connectSimulationEnd(dsid: number, type: number) {
  return usePost<null, {
    id: number
    type: number
  }>('/simulation/carla', {
    id: dsid,
    type,
  }, {
    type: 'carla',
    customDev: true,
  })
}
