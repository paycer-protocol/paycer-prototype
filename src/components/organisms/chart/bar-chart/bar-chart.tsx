import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import options from "@components/organisms/chart/bar-chart/options";

export type SeriesType = Array<{
    data: Array<number>
    chainId: number
    name?: string
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
    const newOptions = JSON.parse(JSON.stringify(options))
    newOptions.xaxis.categories = categories
    newOptions.colors = colors
    newOptions.plotOptions.bar.borderRadius = borderRadius
    if (onMouseEnter) {
        // @ts-ignore
        newOptions.chart.events.mouseMove = function(event, chartContext, config) {
            onMouseEnter(event, chartContext, config)
        }
    }

    return useMemo(() => {
        return (
            <div style={{height: height}}>
                <Chart
                    options={newOptions}
                    series={series}
                    type="bar"
                    height={height}
                />
            </div>
        )
    }, [series])
}

export default BarChart
