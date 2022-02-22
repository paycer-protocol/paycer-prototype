import React, { memo } from 'react'
import options from './options'
import dynamic from 'next/dynamic'

export interface BarChartProps {
    categories: Array<string>
    series: Array<number>
    height?: number
    onMouseEnter?: (event: MouseEvent, chartContext, config) => void
}

const BarChart = (props: BarChartProps) => {
    const { categories, series, height, onMouseEnter } = props
    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
    options.xaxis.categories = categories

    if (onMouseEnter) {
        options.chart.events = {
            dataPointMouseEnter: function(event, chartContext, config) {
                onMouseEnter(event, chartContext, config)
            }
        }
    }

    return (
        <div style={{height: height}}>
            <Chart
                options={options}
                series={[{data: series}]}
                type="bar"
                height={height}
            />
        </div>
    )
}

export default memo(BarChart)
