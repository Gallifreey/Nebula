import type { HistoryType } from '~@/types/history'

export const defaultHistorySetting: HistoryType = {
  entries: [],
  clicked: false,
  popover: false,
  menuPos: {
    x: 0,
    y: 0,
  },
}
