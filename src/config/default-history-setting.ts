import type { HistoryType } from '~@/types/history'

export const defaultHistorySetting: HistoryType = {
  entries: [[]],
  clicked: false,
  popover: false,
  labelling: false,
  menuPos: {
    x: 0,
    y: 0,
  },
  selectionPos: {
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 0,
      y: 0,
    },
  },
}
