import React, {useEffect, useState, memo} from 'react'
import dynamic from 'next/dynamic'
import { TokenType } from '../../../../../types/investment'
import * as Styles from './Styles'
import { ApexOptions } from 'apexcharts'
import api from "../../../../../api";

interface PriceChartProps {
    token0: TokenType
    token1: TokenType
    token1Price: number
}

const PriceChart = (props: PriceChartProps) => {
    const { token0, token1, token1Price } = props
    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
    const [range, setRange] =  useState<string>('')
    const [data, setData] =  useState<any>(null)
    const options =  {
        colors: ["#6d16eb"],
        stroke: {
            width: 2
        },
        chart: {
            toolbar: {
                show: false
            },
            id: 'area-datetime',
            type: 'area',
            zoom: {
                autoScaleYaxis: true
            }
        },

        annotations: {
            yaxis: [{
                y: 30,
                borderColor: '#6d16eb',
                label: {
                    text: '',
                    style: {
                        color: "#fff",
                        background: '#00E396'
                    }
                }
            }],
            xaxis: [{
                borderColor: '#999',
                label: {
                    text: '',
                    style: {
                        color: "#fff",
                        background: '#775DD0'
                    }
                }
            }]
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        xaxis: {
            type: 'datetime',
            tickAmount: 4,
            labels: {
                style: {
                    colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                },
            },
            axisBorder: {
                show: true,
                color: '#213752',
                offsetX: 0,
                offsetY: 0
            },
        },
        yaxis: {
            axisBorder: {
                show: true,
                color: '#213752',
                offsetX: 0,
                offsetY: 0
            },
            opposite: true,
            labels: {
                style: {
                    colors: ['#FFFFFF'],
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                },
            }
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        grid: {
            borderColor: "#555",
            clipMarkers: false,
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        fill: {
            gradient: {
                enabled: true,
                opacityFrom: 0.55,
                opacityTo: 0
            }
        },
    } as ApexOptions
    const selection = 'one_month'

    const fetchChartData = async (range:string = '') => {
        try {
            const response = await api.fetchPriceChart(token0.symbol, token1.symbol, range)
            setRange(range)
            setData({
                    series: [{
                        data: response
                    }],
                    options: options,
                    selection: selection,
                }
            )
        } catch (err) {
        }
    }

    useEffect(() => {
        async function fetch() {
            await fetchChartData()
        }
        fetch()
    }, [token0, token1])

    return (
        <div>
            <div className="d-md-flex justify-content-between">
                <div>
                    <h5 className="text-uppercase text-muted mb-3">
                        {token0.symbol} / {token1.symbol}
                    </h5>
                    <div className="d-flex justify-content-md-between align-items-baseline pt-1">
                        <h2 className="text-uppercase">
                            {token1Price} {token1.symbol}
                        </h2>
                        &nbsp;
                        <Styles.CurrencyInputLabel>
                            <span style={{textTransform: 'none'}}>per</span> {token0.symbol}
                        </Styles.CurrencyInputLabel>
                    </div>
                </div>

                <Styles.Toolbar>
                    <div
                        onClick={async () => await fetchChartData('day')}
                        className={(range === 'day' ? 'is--Active' : '')}
                    >
                        D
                    </div>
                    <div
                        onClick={async () => await fetchChartData('week')}
                        className={(range === 'week' ? 'is--Active' : '')}
                    >
                        W
                    </div>
                    <div
                        onClick={async () => await fetchChartData('month')}
                        className={(range === 'month' ? 'is--Active' : '')}
                    >
                        M
                    </div>
                    <div
                        onClick={async () => await fetchChartData('year')}
                        className={(range === 'year' ? 'is--Active' : '')}
                    >
                        Y
                    </div>
                    <div
                        onClick={async () => await fetchChartData()}
                        className={(range === '' ? 'is--Active' : '')}
                    >
                        ALL
                    </div>
                </Styles.Toolbar>
            </div>

            {data &&
                <Chart
                    {...data}
                    type="area"
                    width={'100%'}
                    height="300"
                />
            }
        </div>
    )
}

export default memo(PriceChart)
