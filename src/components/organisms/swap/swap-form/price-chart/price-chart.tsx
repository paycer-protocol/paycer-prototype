import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import dynamic from 'next/dynamic'
import { SwapProps } from '@components/organisms/swap/swap-form/types'
import * as Styles from './Styles'
import * as MainStyles from '../../Styles'
import { ApexOptions } from 'apexcharts'
import { useCoingeckoTokenPrice } from '@usedapp/coingecko'
import { ChainId } from '@usedapp/core'

const PriceChart = () => {
    const { values } = useFormikContext<SwapProps>()
    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
    const [ data, setData ] = useState({
        series: [{
            data: [
                [1327359600000,30.95],
                [1327446000000,31.34],
                [1327532400000,31.18],
                [1327618800000,31.05],
                [1327878000000,31.00],
                [1327964400000,30.95],
                [1328050800000,31.24],
                [1328137200000,31.29],
                [1328223600000,31.85],
                [1328482800000,31.86],
                [1328569200000,32.28],
                [1328655600000,32.10],
                [1328742000000,32.65],
                [1328828400000,32.21],
                [1329087600000,32.35],
                [1329174000000,32.44],
                [1329260400000,32.46],
                [1329346800000,32.86],
                [1329433200000,32.75],
                [1329778800000,32.54],
                [1329865200000,32.33],
                [1329951600000,32.97],
                [1330038000000,33.41],
                [1330297200000,33.27],
                [1330383600000,33.27],
                [1330470000000,32.89],
                [1330556400000,33.10],
                [1330642800000,33.73],
                [1330902000000,33.22],
                [1330988400000,31.99],
                [1331074800000,32.41],
                [1331161200000,33.05],
                [1331247600000,33.64],
                [1331506800000,33.56],
                [1331593200000,34.22],
                [1331679600000,33.77],
                [1331766000000,34.17],
                [1331852400000,33.82],
                [1332111600000,34.51],
                [1332198000000,33.16],
                [1332284400000,33.56],
                [1332370800000,33.71],
                [1332457200000,33.81],
                [1332712800000,34.40],
                [1332799200000,34.63],
                [1332885600000,34.46],
                [1332972000000,34.48],
                [1333058400000,34.31],
                [1333317600000,34.70],
                [1333404000000,34.31],
                [1333490400000,33.46],
                [1333576800000,33.59],
                [1333922400000,33.22],
                [1334008800000,32.61],
                [1334095200000,33.01],
                [1334181600000,33.55],
                [1334268000000,33.18],
                [1334527200000,32.84],
                [1334613600000,33.84],
                [1334700000000,33.39],
                [1334786400000,32.91],
                [1334872800000,33.06],
                [1335132000000,32.62],
                [1335218400000,32.40],
                [1335304800000,33.13],
                [1335391200000,33.26],
                [1335477600000,33.58],
                [1335736800000,33.55],
                [1335823200000,33.77],
                [1335909600000,33.76],
                [1335996000000,33.32],
                [1336082400000,32.61],
                [1336341600000,32.52],
                [1336428000000,32.67],
                [1336514400000,32.52],
                [1336600800000,31.92],
                [1336687200000,32.20],
                [1336946400000,32.23],
                [1337032800000,32.33],
                [1337119200000,32.36],
                [1337205600000,32.01],
                [1337292000000,31.31],
                [1337551200000,32.01],
                [1337637600000,32.01],
                [1337724000000,32.18],
                [1337810400000,31.54],
                [1337896800000,31.60],
                [1338242400000,32.05],
                [1338328800000,31.29],
                [1338415200000,31.05],
                [1338501600000,29.82],
                [1338760800000,30.31],
                [1338847200000,30.70],
                [1338933600000,31.69],
                [1339020000000,31.32],
                [1339106400000,31.65],
                [1339365600000,31.13],
                [1339452000000,31.77],
                [1339538400000,31.79],
                [1339624800000,31.67],
                [1339711200000,32.39],
                [1339970400000,32.63],
                [1340056800000,32.89],
                [1340143200000,31.99],
                [1340229600000,31.23],
                [1340316000000,31.57],
                [1340575200000,30.84],
                [1340661600000,31.07],
                [1340748000000,31.41],
                [1340834400000,31.17],
                [1340920800000,32.37],
                [1341180000000,32.19],
                [1341266400000,32.51],
                [1341439200000,32.53],
                [1341525600000,31.37],
                [1341784800000,30.43],
                [1341871200000,30.44],
                [1341957600000,30.20],
                [1342044000000,30.14],
                [1342130400000,30.65],
                [1342389600000,30.40],
                [1342476000000,30.65],
                [1342562400000,31.43]
            ]
        }],
        options: {
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
                    x: new Date('14 Nov 2012').getTime(),
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
                min: new Date('01 Mar 2012').getTime(),
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
        } as ApexOptions,
        selection: 'one_month',
    })

    const updateData = (timeline) => {
        const newData = data
        newData.selection = timeline
        setData(newData)

        switch (timeline) {
            case 'one_month':
                ApexCharts.exec(
                    'area-datetime',
                    'zoomX',
                    new Date('28 Jan 2013').getTime(),
                    new Date('27 Feb 2013').getTime()
                )
                break
            case 'six_months':
                ApexCharts.exec(
                    'area-datetime',
                    'zoomX',
                    new Date('27 Sep 2012').getTime(),
                    new Date('27 Feb 2013').getTime()
                )
                break
            case 'one_year':
                ApexCharts.exec(
                    'area-datetime',
                    'zoomX',
                    new Date('27 Feb 2012').getTime(),
                    new Date('27 Feb 2013').getTime()
                )
                break
            case 'ytd':
                ApexCharts.exec(
                    'area-datetime',
                    'zoomX',
                    new Date('01 Jan 2013').getTime(),
                    new Date('27 Feb 2013').getTime()
                )
                break
            case 'all':
                ApexCharts.exec(
                    'area-datetime',
                    'zoomX',
                    new Date('23 Jan 2012').getTime(),
                    new Date('27 Feb 2013').getTime()
                )
                break
            default:
        }
    }

    const exchangeRate = useCoingeckoTokenPrice(values.token0.chainAddresses[ChainId.Mainnet], 'usd')

    return (
        <div>
            <div className="d-md-flex justify-content-between">
                <div>
                    <MainStyles.InfoHeadline>
                        {values.token0.symbol} / {values.token1.symbol}
                    </MainStyles.InfoHeadline>
                    <div className="d-flex justify-content-md-between align-items-baseline">
                        <MainStyles.Headline>
                            {exchangeRate || 1} {values.token1.symbol}
                        </MainStyles.Headline>
                            &nbsp;
                        <div className="text-muted text-uppercase h5">
                            <span style={{textTransform: 'none'}}>per</span> {values.token0.symbol}
                        </div>
                    </div>
                </div>
                <Styles.Toolbar>
                    <button
                        onClick={() => updateData('one_month')}
                        className={(data.selection === 'one_month' ? 'active' : '')}
                    >
                        1M
                    </button>
                    &nbsp;
                    <button
                        onClick={() => updateData('six_months')}
                        className={(data.selection === 'six_months' ? 'active' : '')}
                    >
                        6M
                    </button>
                    &nbsp;
                    <button
                        onClick={() => updateData('one_year')}
                        className={(data.selection === 'one_year' ? 'active' : '')}
                    >
                        1Y
                    </button>
                    &nbsp;
                    <button
                        onClick={() => updateData('ytd')}
                        className={(data.selection === 'ytd' ? 'active' : '')}
                    >
                        YTD
                    </button>
                    &nbsp;
                    <button
                        onClick={() => updateData('all')}
                        className={(data.selection === 'all' ? 'active' : '')}
                    >
                        ALL
                    </button>
                </Styles.Toolbar>
            </div>
            <Chart
                {...data}
                type="area"
                width={'100%'}
                height="300"
            />
        </div>
    )
}

export default PriceChart
