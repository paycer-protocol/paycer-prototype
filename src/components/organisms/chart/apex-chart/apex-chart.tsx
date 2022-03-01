import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import options from '@components/organisms/chart/apex-chart/options'

export type SeriesType = Array<{
    data: Array<number>
    chainId: number
    name?: string
}>

export interface ApexChartProps {
    categories?: Array<string>
    series: SeriesType
    height?: number
    onMouseEnter?: (event: MouseEvent, chartContext, config) => void
    seriesColors?: Array<string>
    borderRadius?: number
    isSmall?: boolean
    type: 'area' | 'bar'
}

const ApexChart = (props: ApexChartProps) => {
    const {
        categories = [],
        series,
        height,
        onMouseEnter,
        seriesColors,
        borderRadius = 8,
        type,
        isSmall
    } = props

    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

    const newOptions = JSON.parse(JSON.stringify(options))
    newOptions.xaxis.categories = categories
    newOptions.colors = seriesColors
    newOptions.plotOptions.bar.borderRadius = borderRadius

    if (onMouseEnter) {
        // @ts-ignore
        newOptions.chart.events.mouseMove = function(event, chartContext, config) {
            onMouseEnter(event, chartContext, config)
        }
    }

    if (type === 'area') {
        newOptions.fill = {
            type: "gradient",
            gradient: {
                shadeIntensity: 0.3,
                opacityFrom: 0.5,
                opacityTo: 0.1,
                stops: [0, 100]
            }
        }
        newOptions.stroke = {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            colors: undefined,
            width: 2,
            dashArray: 0,
        }
    }

    let chartHeight:string = '105%'
    if (isSmall) {
        if (type === 'area') {
            chartHeight = '130%'
        }
        if (type === 'bar') {
            chartHeight = '120%'
        }
    }

    return useMemo(() => {
        return (
            <div style={{height: height, marginLeft: '-1.9%'}}>
                <Chart
                    options={newOptions}
                    series={series}
                    type={type}
                    height={chartHeight}
                    width="101%"
                />
            </div>
        )
    }, [series])
}

export default ApexChart
