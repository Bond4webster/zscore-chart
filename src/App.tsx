import React from 'react'
import ZScoreLineChart from './components/ZScoreLineChart'
import { dataWithZScores } from './data/chartData'

const App: React.FC = () => {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>График с выделением z-score</h1>
      <ZScoreLineChart data={dataWithZScores} />
    </div>
  )
}

export default App
