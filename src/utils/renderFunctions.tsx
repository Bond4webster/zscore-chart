import { Line } from 'recharts'
import type { SegmentColor, ZScoreDataPoint } from '../types'

type DotProps =
  | {
      cx: number
      cy: number
      index: number
    }
  | any

type LineName = 'uv' | 'pv'

const renderDot = (props: DotProps, r: number, name: LineName, data: ZScoreDataPoint[]) => {
  const { cx, cy, index } = props
  const lineNameObject = data[index][name]
  const isAboveThreshold = lineNameObject.isAboveZScore

  return (
    <circle key={index} cx={cx} cy={cy} r={r} fill={isAboveThreshold ? 'red' : lineNameObject.color} stroke="none" />
  )
}

export const renderLines = (name: LineName, data: ZScoreDataPoint[]) => {
  return (
    <Line
      type="monotone"
      name={name}
      dataKey={(props) => props[name].value}
      stroke={`url(#${name}Gradient)`}
      dot={(props) => renderDot(props, 4, name, data)}
      activeDot={(props: DotProps) => renderDot(props, 8, name, data)}
      isAnimationActive={false}
      connectNulls
    />
  )
}

export const renderGradient = (name: LineName, gradient: SegmentColor[]) => {
  return (
    <defs>
      <linearGradient id={`${name}Gradient`} x1="0" y1="0" x2="100%" y2="0">
        {gradient.map((el) => (
          <stop key={el.offset} offset={el.offset * 100 + '%'} stopColor={el.color} />
        ))}
      </linearGradient>
    </defs>
  )
}
