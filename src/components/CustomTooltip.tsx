interface TooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any
  }>
  label?: string
}

// Расширенный Tooltip с отображением z-score
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#fff',
          padding: '10px',
          border: '1px solid #ccc',
        }}
      >
        <p>{label}</p>
        {payload.map((entry, index) => {
          const { name, payload: innerPayload } = entry
          const { zScore, isAboveZScore, color, value } = innerPayload[name]

          return (
            <p key={`item-${index}`} style={{ color }}>
              {`${name}: ${value}`}
              <br />
              <span
                style={{ color: isAboveZScore ? 'red' : 'inherit' }}
              >{`${name} Z-Score: ${zScore.toFixed(2)}`}</span>
            </p>
          )
        })}
      </div>
    )
  }
  return null
}

export default CustomTooltip
