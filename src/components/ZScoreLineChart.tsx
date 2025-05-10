import React from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { type ZScoreDataPoint } from '../types'
import CustomTooltip from './CustomTooltip'
import { determineColorSegments } from '../utils/statistics'
import { renderGradient, renderLines } from '../utils/renderFunctions'

interface ZScoreLineChartProps {
  data: ZScoreDataPoint[]
  threshold?: number
}

const ZScoreLineChart: React.FC<ZScoreLineChartProps> = ({ data, threshold = 1 }) => {
  const uvGradient = determineColorSegments(
    data.map((el) => el.uv.isAboveZScore),
    '#8884d8'
  )
  const pvGradient = determineColorSegments(
    data.map((el) => el.pv.isAboveZScore),
    '#82ca9d'
  )

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Линейный график с выделением аномальных значений (|z-score| &gt; {threshold})</h2>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {renderLines('uv', data)}
          {renderLines('pv', data)}
          {renderGradient('uv', uvGradient)}
          {renderGradient('pv', pvGradient)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ZScoreLineChart
