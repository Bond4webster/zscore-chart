import type { SegmentColor } from '../types'

export const calculateMean = (values: number[]): number => {
  if (values.length === 0) return 0
  const sum = values.reduce((acc, val) => acc + val, 0)
  return sum / values.length
}

export const calculateStandardDeviation = (values: number[], mean: number): number => {
  if (values.length <= 1) return 0

  const squaredDifferences = values.map((val) => Math.pow(val - mean, 2))
  const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / (values.length - 1)

  return Math.sqrt(variance)
}

export const calculateZScores = (values: number[]): number[] => {
  const mean = calculateMean(values)
  const stdDev = calculateStandardDeviation(values, mean)

  if (stdDev === 0) return values.map(() => 0)

  return values.map((val) => (val - mean) / stdDev)
}

export const checkIsAboveZScore = (value: number, threshold: number = 1): boolean => {
  return Math.abs(value) > threshold
}

export const determineColorSegments = (isAboveThresholds: boolean[], color: string): SegmentColor[] => {
  const segments: SegmentColor[] = []
  let currentSegment: SegmentColor | null = null
  const getPersent = (ind: number): number => ind / (isAboveThresholds.length - 1)

  isAboveThresholds.forEach((isAboveThreshold, index) => {
    const offset = getPersent(index)
    currentSegment = {
      offset,
      color: isAboveThreshold ? 'red' : color,
    }
    segments.push(currentSegment)
  })

  return segments
}
