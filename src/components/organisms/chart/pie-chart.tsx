import React from 'react'
import { PieChart as BasePieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export interface PieChartData {
  name: string
  value: number
}

export interface PieChartColor {
  name: string
  value: number
}

export interface PieChartProps {
  data: PieChartData[]
  colors: PieChartColor[]
  dataKey: string
  containerWidth?: number
  containerHeight?: number
}

const PieChart = (props: PieChartProps) => {
  const { data, colors, dataKey, containerWidth = 200, containerHeight = 200 } = props

  const renderColors = () => data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={String(colors[index % colors.length])} />
  ))

  return (
    <ResponsiveContainer width={containerWidth} height={containerHeight}>
      <BasePieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey={dataKey}
        >
          {renderColors()}
        </Pie>
      </BasePieChart>
    </ResponsiveContainer>
  )
}

export default PieChart
