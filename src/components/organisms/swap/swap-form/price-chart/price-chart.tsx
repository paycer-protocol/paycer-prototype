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


    const fallbackMock = [
        [1327359600000,0.075],
        [1327446000000,0.074],
        [1327532400000,0.078],
        [1327618800000,0.075],
        [1327878000000,0.070],
        [1327964400000,0.075],
        [1328050800000,0.074],
        [1328137200000,0.079],
        [1328223600000,0.075],
        [1328482800000,0.076],
        [1328569200000,0.078],
        [1328655600000,0.070],
        [1328742000000,0.075],
        [1328828400000,0.071],
        [1329087600000,0.075],
        [1329174000000,0.074],
        [1329260400000,0.076],
        [1329346800000,0.076],
        [1329433200000,0.075],
        [1329778800000,0.074],
        [1329865200000,0.073],
        [1329951600000,0.077],
        [1330038000000,0.071],
        [1330297200000,0.077],
        [1330383600000,0.077],
        [1330470000000,0.079],
        [1330556400000,0.070],
        [1330642800000,0.073],
        [1330902000000,0.072],
        [1330988400000,0.079],
        [1331074800000,0.071],
        [1331161200000,0.075],
        [1331247600000,0.074],
        [1331506800000,0.076],
        [1331593200000,0.072],
        [1331679600000,0.077],
        [1331766000000,0.077],
        [1331852400000,0.072],
        [1332111600000,0.071],
        [1332198000000,0.076],
        [1332284400000,0.076],
        [1332370800000,0.071],
        [1332457200000,0.071],
        [1332712800000,0.070],
        [1332799200000,0.073],
        [1332885600000,0.076],
        [1332972000000,0.078],
        [1333058400000,0.071],
        [1333317600000,0.070],
        [1333404000000,0.071],
        [1333490400000,0.076],
        [1333576800000,0.079],
        [1333922400000,0.072],
        [1334008800000,0.071],
        [1334095200000,0.071],
        [1334181600000,0.075],
        [1334268000000,0.078],
        [1334527200000,0.074],
        [1334613600000,0.074],
        [1334700000000,0.079],
        [1334786400000,0.071],
        [1334872800000,0.076],
        [1335132000000,0.072],
        [1335218400000,0.070],
        [1335304800000,0.073],
        [1335391200000,0.076],
        [1335477600000,0.078],
        [1335736800000,0.075],
        [1335823200000,0.077],
        [1335909600000,0.076],
        [1335996000000,0.072],
        [1336082400000,0.071],
        [1336341600000,0.072],
        [1336428000000,0.077],
        [1336514400000,0.072],
        [1336600800000,0.072],
        [1336687200000,0.070],
        [1336946400000,0.073],
        [1337032800000,0.073],
        [1337119200000,0.076],
        [1337205600000,0.071],
        [1337292000000,0.071],
        [1337551200000,0.071],
        [1337637600000,0.071],
        [1337724000000,0.078],
        [1337810400000,0.074],
        [1337896800000,0.070],
        [1338242400000,0.075],
        [1338328800000,0.079],
        [1338415200000,0.075],
        [1338501600000,0.072],
        [1338760800000,0.071],
        [1338847200000,0.070],
        [1338933600000,0.079],
        [1339020000000,0.072],
        [1339106400000,0.075],
        [1339365600000,0.073],
        [1339452000000,0.077],
        [1339538400000,0.079],
        [1339624800000,0.077],
        [1339711200000,0.079],
        [1339970400000,0.073],
        [1340056800000,0.079],
        [1340143200000,0.079],
        [1340229600000,0.073],
        [1340316000000,0.077],
        [1340575200000,0.074],
        [1340661600000,0.077],
        [1340748000000,0.071],
        [1340834400000,0.077],
        [1340920800000,0.077],
        [1341180000000,0.079],
        [1341266400000,0.071],
        [1341439200000,0.073],
        [1341525600000,0.077],
        [1341784800000,0.073],
        [1341871200000,0.074],
        [1341957600000,0.070],
        [1342044000000,0.074],
        [1342130400000,0.075],
        [1342389600000,0.070],
        [1342476000000,0.075],
        [1342562400000,0.073]
    ]


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

    const [data, setData] =  useState<any>({
        series: [{
            data: fallbackMock
        }],
        options: options,
        selection: selection,
    })

    const fetchChartData = async (range:string = '') => {
        try {
            const response = await api.fetchPriceChart(token0.symbol, token1.symbol, range)
            if (response) {
                setRange(range)
                setData({
                        series: [{
                            data: response
                        }],
                        options: options,
                        selection: selection,
                    }
                )
            }
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
