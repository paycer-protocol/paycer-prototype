import React, { useMemo } from 'react'
import options from './options'
import dynamic from 'next/dynamic'

export type SeriesType = Array<{
    data: Array<number>
}>

export interface BarChartProps {
    categories?: Array<string>
    series: SeriesType
    height?: number
    onMouseEnter?: (event: MouseEvent, chartContext, config) => void
    colors?: Array<string>
    borderRadius?: number
}

const BarChart = (props: BarChartProps) => {
    const {
        categories = [],
        series,
        height,
        onMouseEnter,
        colors,
        borderRadius = 8
    } = props

    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

    options.xaxis.categories = categories
    options.colors = colors
    options.plotOptions.bar.borderRadius = borderRadius

    if (onMouseEnter) {
        // @ts-ignore
        options.chart.events.mouseMove = function(event, chartContext, config) {
            onMouseEnter(event, chartContext, config)
        }
    }

    return useMemo(() => {
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
    }, [series])
}

export default BarChart
