import React, {useEffect, useState, memo} from 'react'
import classnames from 'classnames'
import dynamic from 'next/dynamic'
import { TokenType } from '../../../../../types/investment'
import * as Styles from './Styles'
import { ApexOptions } from 'apexcharts'
import api from "../../../../api";

interface PriceChartProps {

}

const PriceChart = () => {
    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
    const [interval, setInterval] =  useState<string>('')


    const options = {
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000],
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },

        },
        yaxis: {
            labels: {
                show: false,
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                type: "vertical",
                shadeIntensity: 0.5,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90],
                colorStops: [
                    {
                        offset: 0,
                        color: "rgba(133, 12, 167, 1)",
                        opacity: 0.8
                    },



                    {
                        offset: 90,
                        color: "rgba(66, 1, 220, 1)",
                        opacity: 0.8
                    },

                ]
            }
        },
        grid: {
            borderColor: 'transparent'
        },
        dataLabels: {
            enabled: true,
            dropShadow: {
                enabled: true,
                left: 2,
                top: 2,
                opacity: 0.5
            },
            style: {
                fontSize: '12px',
                fontWeight: 'normal',
            },
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: "bottom",
                },
                columnWidth: '40%',
                borderRadius: 14,
            }
        },

    }
    const series = [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91, 88, 56]
        }
    ]

    return (
        <Chart
            options={options}
            series={series}
            type="bar"
            height={400}
        />
    )
}

export default memo(PriceChart)
