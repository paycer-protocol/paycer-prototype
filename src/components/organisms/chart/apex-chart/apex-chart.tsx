import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import options from '@components/organisms/chart/apex-chart/options'
import { ApexChartProps } from './types'


const ApexChart = (props: ApexChartProps) => {
    const {
        categories = [],
        series,
        height,
        onMouseMove,
        onMouseLeave,
        seriesColors,
        borderRadius = 8,
        renderToolTip,
        type,
        isSmall
    } = props

    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
    const newOptions = JSON.parse(JSON.stringify(options))

    newOptions.xaxis.categories = categories
    newOptions.colors = seriesColors
    newOptions.plotOptions.bar.borderRadius = borderRadius

    if (renderToolTip) {
        newOptions.tooltip.custom = function ({series, seriesIndex, dataPointIndex, w}) {
            return renderToolTip(series, seriesIndex, dataPointIndex, w)
        }
    }

    if (onMouseMove) {
        // @ts-ignore
        newOptions.chart.events.mouseMove = function(event, chartContext, config) {
            onMouseMove(event, chartContext, config)
        }
    }

    if (onMouseMove && onMouseLeave) {
        // @ts-ignore
        newOptions.chart.events.mouseLeave = function(event, chartContext, config) {
            onMouseLeave()
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
                {/* @ts-ignore */}
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
