import React, { memo } from 'react'
import options from './options'
import dynamic from 'next/dynamic'

export type SeriesType = Array<{
    data: Array<number>
}>

export interface BarChartProps {
    categories?: Array<string>
    series: SeriesType
    height?: number
    colors?: Array<string>
    borderRadius?: number
}

const BarChart = (props: BarChartProps) => {
    const {
        categories = [],
        series,
        height,
        colors,
        borderRadius = 8
    } = props

    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

    options.xaxis.categories = categories
    options.colors = colors
    options.plotOptions.bar.borderRadius = borderRadius

    return (
        <div style={{height: height}}>
            <Chart
                options={options}
                series={series}
                type="bar"
                height={height}
            />
        </div>
    )
}

export default memo(BarChart)
