import React, { useEffect, useState, memo } from 'react'
import classnames from 'classnames'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { TokenType } from '../../../../types/investment'
import * as Styles from './Styles'
import api from '../../../../api'

interface PriceChartProps {
  token0: TokenType
  token1: TokenType
  token1Price: number
}

const PriceChart = (props: PriceChartProps) => {
  const { token0, token1, token1Price } = props
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
  const [interval, setInterval] = useState<string>('')

  const options = {
    colors: ['#6d16eb'],
    stroke: {
      width: 2,
    },
    chart: {
      toolbar: {
        show: false,
      },
      id: 'area-datetime',
      type: 'area',
      zoom: {
        autoScaleYaxis: true,
      },
    },

    annotations: {
      yaxis: [{
        y: 30,
        borderColor: '#6d16eb',
        label: {
          text: '',
          style: {
            color: '#fff',
            background: '#00E396',
          },
        },
      }],
      xaxis: [{
        borderColor: '#999',
        label: {
          text: '',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
        },
      }],
    },
    dataLabels: {
      enabled: false,
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
        offsetY: 0,
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: '#213752',
        offsetX: 0,
        offsetY: 0,
      },
      opposite: true,
      labels: {
        style: {
          colors: ['#FFFFFF'],
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    grid: {
      borderColor: '#555',
      clipMarkers: false,
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
  } as ApexOptions
  const selection = 'one_month'

  const [data, setData] = useState<any>({
    series: [],
    options,
    selection,
  })

  const fetchChartData = async (interval = '') => {
    try {
      const response = await api.fetchPriceChart(token0.symbol, token1.symbol, interval)

      if (response) {
        setInterval(interval)
        setData({
          series: [{
            data: response,
          }],
          options,
          selection,
        })
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
          <h5 className="text-uppercase text-muted mb-3 mb-md-4">
            {token0.symbol}
            {' '}
            /
            {token1.symbol}
          </h5>
          <div className="d-flex justify-content-md-between align-items-baseline">
            <h2 className="text-uppercase">
              {token1Price}
              {' '}
              {token1.symbol}
            </h2>
                        &nbsp;
            <Styles.CurrencyInputLabel>
              <span style={{ textTransform: 'none' }}>per</span>
              {' '}
              {token0.symbol}
            </Styles.CurrencyInputLabel>
          </div>
        </div>

        <Styles.Toolbar>
          <div
            onClick={async () => fetchChartData('daily')}
            className={classnames({ 'is--Active': interval === 'daily' })}
          >
            D
          </div>
          <div
            onClick={async () => fetchChartData('weekly')}
            className={classnames({ 'is--Active': interval === 'weekly' })}
          >
            W
          </div>
          <div
            onClick={async () => fetchChartData('monthly')}
            className={classnames({ 'is--Active': interval === 'day' })}
          >
            M
          </div>
          <div
            onClick={async () => fetchChartData('yearly')}
            className={classnames({ 'is--Active': interval === 'yearly' })}
          >
            Y
          </div>
          <div
            onClick={async () => fetchChartData()}
            className={(interval === '' ? 'is--Active' : '')}
          >
            ALL
          </div>
        </Styles.Toolbar>
      </div>

      {data
                && (
                <>
                  {/* @ts-ignore */}
                  <Chart
                    {...data}
                    type="area"
                    width="100%"
                    height="300"
                  />
                </>
                )}
    </div>
  )
}

export default memo(PriceChart)
