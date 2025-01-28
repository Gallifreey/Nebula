import type { PointType } from './canvas'
import { defaultHistorySetting } from '~@/config/default-history-setting'
import type { HistoryType, entryType } from '~@/types/history'

export const useHistoryStore = defineStore('history', () => {
  const setting = reactive<HistoryType>(defaultHistorySetting)
  function push(entry: entryType, curID: number) {
    setting.entries[curID].push(entry)
  }
  function pop(curID: number, entry?: entryType) {
    if (entry) {
      const pos = setting.entries[curID].indexOf(entry)
      setting.entries.splice(pos, pos + 1)
    }
    else {
      setting.entries.pop()
    }
  }
  function getSize() {
    return setting.entries.length
  }
  function getByIndex(index: number) {
    return index >= 0 && index <= getSize() ? setting.entries[index] : null
  }
  function getByID(id: string, curID: number) {
    setting.entries.forEach((entry) => {
      if (entry[curID].id === id)
        return entry
    })
    return null
  }
  function isLabelling() {
    return setting.labelling
  }
  function setSelecionPos(pos: PointType, type: 'start' | 'end') {
    setting.selectionPos[type] = pos
  }
  return {
    setting,
    push,
    pop,
    getSize,
    getByIndex,
    getByID,
    isLabelling,
    setSelecionPos,
  }
})
