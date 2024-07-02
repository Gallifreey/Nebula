import { defaultHistorySetting } from '~@/config/default-history-setting'
import type { HistoryType, entryType } from '~@/types/history'

export const useHistoryStore = defineStore('history', () => {
  const setting = reactive<HistoryType>(defaultHistorySetting)
  function push(entry: entryType) {
    setting.entries.push(entry)
  }
  function pop(entry?: entryType) {
    if (entry) {
      const pos = setting.entries.indexOf(entry)
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
  function getByID(id: string) {
    setting.entries.forEach((entry) => {
      if (entry.id === id)
        return entry
    })
    return null
  }
  return {
    setting,
    push,
    pop,
    getSize,
    getByIndex,
    getByID,
  }
})
