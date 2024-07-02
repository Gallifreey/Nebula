import type { PointType } from './canvas'

export interface BBOX extends PointType {
  height: number
  width: number
}

export interface LineType {
  start: PointType
  end: PointType
}

export interface HistoryEntryBase {
  id: string
  type: string
}

export interface BBOXEntry extends HistoryEntryBase {
  bbox: BBOX
}

export interface KeyPointsEntry extends HistoryEntryBase {
  points: PointType[]
}

export interface SegmentEntry extends HistoryEntryBase {
  points: PointType[]
}

export interface SolidEntry extends HistoryEntryBase {
  front: BBOX
  back: BBOX
}

export interface LineEntry extends HistoryEntryBase {
  lines: LineType[]
}

export type entryType = BBOXEntry | KeyPointsEntry | SegmentEntry | SolidEntry | LineEntry

export interface HistoryType {
  entries: entryType[]
}
