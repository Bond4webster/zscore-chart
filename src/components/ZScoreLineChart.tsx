import React from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { type LineName, type ZScoreDataPoint } from '../types'
import CustomTooltip from './CustomTooltip'
import { renderGradients, renderLines } from '../utils/renderFunctions'

interface ZScoreLineChartProps {
  data: ZScoreDataPoint[]
  threshold?: number
}

const ZScoreLineChart: React.FC<ZScoreLineChartProps> = ({ data, threshold = 1 }) => {
  const lineNames: LineName[] = ['uv', 'pv']
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
          {renderLines(lineNames, data)}
          {renderGradients(lineNames, data)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ZScoreLineChart
