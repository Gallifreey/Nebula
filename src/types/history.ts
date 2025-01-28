import type { Node } from '@antv/x6'
import type { PointType } from './canvas'

export interface BBOX extends PointType, SizeType {}

export interface SizeType {
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
  label: string
  color: string
}

export interface BBOXEntry extends HistoryEntryBase {
  type: 'bbox'
  bbox: BBOX
}

export interface KeyPointsEntry extends HistoryEntryBase {
  type: 'keypoints'
  points: PointType[]
}

export interface SegmentEntry extends HistoryEntryBase {
  type: 'segment'
  points: PointType[]
}

export interface SolidEntry extends HistoryEntryBase {
  type: 'solid'
  front: BBOX
  back: BBOX
}

export interface LineEntry extends HistoryEntryBase {
  type: 'line'
  lines: LineType[]
}

export type entryType = Node.Metadata | KeyPointsEntry | SegmentEntry | SolidEntry | LineEntry

export type EntryType = entryType['type']

export interface HistoryType {
  entries: entryType[][]
  clicked: boolean
  popover: boolean
  labelling: boolean
  menuPos: PointType
  selectionPos: {
    start: PointType
    end: PointType
  }
}
