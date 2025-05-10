export interface DataPoint {
  name: string
  uv: number
  pv: number
}

export interface LineObject {
  value: number
  zScore: number
  isAboveZScore: boolean
  color: string
}

export interface ZScoreDataPoint {
  name: string
  uv: LineObject
  pv: LineObject
}

export interface SegmentColor {
  offset: number
  color: string
}

export type LineName = 'uv' | 'pv'
