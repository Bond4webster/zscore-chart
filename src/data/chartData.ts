import type { DataPoint, ZScoreDataPoint } from '../types'
import { calculateZScores, checkIsAboveZScore } from '../utils/statistics'

export const originalData: DataPoint[] = [
  { name: 'Page A', uv: 4000, pv: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398 },
  { name: 'Page C', uv: 2000, pv: 9800 },
  { name: 'Page D', uv: 2780, pv: 3908 },
  { name: 'Page E', uv: 1890, pv: 4800 },
  { name: 'Page F', uv: 2390, pv: 3800 },
  { name: 'Page G', uv: 3490, pv: 4300 },
]

// Извлекаем значения для каждой серии данных
const uvValues = originalData.map((item) => item.uv)
const pvValues = originalData.map((item) => item.pv)

// Рассчитываем z-score для каждой серии
const uvZScores = calculateZScores(uvValues)
const pvZScores = calculateZScores(pvValues)

// Создаем новый набор данных, включающий z-score
export const dataWithZScores: ZScoreDataPoint[] = originalData.map((item, index) => {
  const { name, uv, pv } = item
  const uvZScore = uvZScores[index]
  const pvZScore = pvZScores[index]
  return {
    name,
    uv: {
      value: uv,
      zScore: uvZScore,
      isAboveZScore: checkIsAboveZScore(uvZScore),
      color: '#8884d8',
    },
    pv: {
      value: pv,
      zScore: pvZScore,
      isAboveZScore: checkIsAboveZScore(pvZScore),
      color: '#82ca9d',
    },
  }
})
