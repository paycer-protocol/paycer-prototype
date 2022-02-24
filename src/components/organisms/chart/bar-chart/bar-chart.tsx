import React, { memo } from 'react'
import options from './options'
import dynamic from 'next/dynamic'

export type SeriesType = Array<{
    data: Array<number>
}>

export interface BarChartProps {
    categories: Array<string>
    series: SeriesType
    height?: number
    onMouseEnter?: (event: MouseEvent, chartContext, config) => void
    onMouseLeave?: () => void
    colors?: Array<string>
}

const BarChart = (props: BarChartProps) => {
    const {
        categories,
        series,
        height,
        onMouseEnter,
        onMouseLeave,
        colors
    } = props

    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
    options.xaxis.categories = categories
    options.colors = colors

    if (onMouseEnter) {
        // @ts-ignore
        options.chart.events.dataPointMouseEnter = function(event, chartContext, config) {
            onMouseEnter(event, chartContext, config)
        }
    }

    if (onMouseLeave) {
        // @ts-ignore
        options.chart.events.dataPointMouseLeave = function(event, chartContext, config) {
            onMouseLeave()
        }
    }

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
