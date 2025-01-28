import type { Label } from './structure'

export interface ConfigType {
  contextMenuWidth: number
  contextMenuTitleType: string
  globalLabels: Label[]
  currentPGType: string
  curID: number
}
