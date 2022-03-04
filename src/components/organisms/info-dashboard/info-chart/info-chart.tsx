import React, { useState, useEffect } from 'react'
import { infoChartProviders } from '@providers/networks'
import * as Styles from './Styles'
import api from '../../../../api'
import ApexChart from '@components/organisms/chart/apex-chart'
import { SeriesType } from '@components/organisms/chart/apex-chart/apex-chart'
import CurrencyIcon from '@components/atoms/currency-icon'
import ChainLegend from '@components/organisms/info-dashboard/chain-legend'
import { FormattedNumber } from '../../../atoms/number/formatted-number'
import { useFormikContext } from 'formik'
import { InfoDashboardFormType } from '@components/organisms/info-dashboard/info-dashboard'
import Icon from '@components/atoms/icon'
import { ZoomOutMap, CloseFullscreen } from '@styled-icons/material-outlined'
import {t} from "@lingui/macro";

type TimeSectionState = '1M' | '3M' | '1Y'

export interface InfoChartProps {
    headline?: string
    isSmall?: boolean
    isTransactionChart?: boolean
    dataType: 'staking' | 'vesting' | 'holders' | 'dailyStaked' | 'dailyWithdrawn' | 'dailyHolders' | 'dailyVestingWithdrawn' | 'dailyTransactions'
    chartType: 'area' | 'bar'
    isModal?: boolean
    handleShowModal?: (InfoChartProps) => void
    handleHideModal?: () => void
}

const InfoChart = (props: InfoChartProps) => {
    const {
        isSmall,
        headline,
        dataType,
        chartType,
        isModal,
        handleShowModal,
        isTransactionChart = false,
        handleHideModal
    } = props

    const PcrUsdPrice = 0.025 // TODO FETCH REAL PRICE
    const [initialValueShown, setInitialValueShown] = useState<number>(0)
    const [initialValueShownHovered, setInitialValueShownHovered] = useState<any>(null)
    const [showTimeSectionDropdown, setShowTimeSectionDropdown] = useState<boolean>(false)
    const [series, setSeries] = useState<SeriesType>([])
    const [seriesColors, setSeriesColors] = useState<string[]>(['#FFFFFF'])
    const [timeSection, setTimeSection] = useState<TimeSectionState>('1M')
    const { values, setFieldValue } = useFormikContext<InfoDashboardFormType>()

    useEffect(() => {
        async function fetch() {
            try {
                const response = await api.fetchChartData(values.selectedChains, dataType)
                const payload = response?.data || null
                const chartData = payload['hydra:member']

                if (chartData) {
                    transformChartSeries(chartData)
                }
            } catch {
            }
        }
        fetch()
    }, [values.selectedChains, timeSection])

    useEffect(() => {
        document.addEventListener('click', function() {
            setShowTimeSectionDropdown(false)
        })
    }, [])

    // transforms data from paycer api for apex charts series needs
    const transformChartSeries = (chartData) => {

        let initialValue = 0
        const transformedChartSeries: SeriesType = []
        let colors = []

        // if chainId filter selection contains 0 it must be all
        if (values.selectedChains.includes(0)) {
            const allChartValues = chartData.map(a => Number(a.data.substring(0, a.data.length - 18)))
            transformedChartSeries.push({
                chainId: 0,
                data: allChartValues,
                name: t`All Chains`
            })
            //colors.push('#FFFFFF')
            colors.push(infoChartProviders[137].color)
        } else {
            values.selectedChains.map(chainId => {
                const filteredByChainId = chartData.filter(f => f.chainId === chainId)
                if (filteredByChainId) {
                    const valuesByChainId = filteredByChainId.map(a => Number(a.data.substring(0, a.data.length - 18)))
                    transformedChartSeries.push({
                        chainId: chainId,
                        data: valuesByChainId,
                        name: infoChartProviders[chainId].chainName
                    })
                    colors.push(infoChartProviders[chainId].color)
                }
            })
        }
        if (isTransactionChart) {
            transformedChartSeries.map(series => {
                initialValue += series.data.reduce(
                    (previousValue, currentValue) => previousValue + currentValue,
                    0
                )
            })
        } else {
            transformedChartSeries.map(series => {
                if (series.data.length) {
                    initialValue+= series.data[series.data.length - 1]
                }

            })
        }

        setSeries(transformedChartSeries)
        setInitialValueShown(initialValue)
        setSeriesColors(colors)

    }

    const onMouseEnter = (MouseEvent, chartContext, config) => {
        const dataPointIndex = config.dataPointIndex
        const seriesIndex = config.seriesIndex
        if (dataPointIndex === -1 || seriesIndex === -1) {
            setInitialValueShownHovered(null)
            return
        }
        const hoveredSeries = series[seriesIndex]
        if (!hoveredSeries) {
            return
        }
        const staked = hoveredSeries.data[dataPointIndex]
        setInitialValueShownHovered(staked)
    }

    return (
        <div className={`card ${isModal ? 'mb-0' : ''}`}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className={`text-uppercase text-muted mb-3`}>{headline}</h5>
                        <div className="d-flex align-items-baseline">
                            <h2 className="display-4 fw-normal d-flex mb-2" style={isSmall ? {fontSize: '18px'} : null}>
                                <FormattedNumber
                                    value={initialValueShownHovered || initialValueShown}
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={2}
                                />
                                <CurrencyIcon
                                    symbol="PCR"
                                    className="position-relative"
                                    width={isSmall ? 16 : 30}
                                    height={isSmall ? 16 : 30}
                                    style={{left: '8px', top: '2px'}}
                                />
                            </h2>
                        </div>
                        {!isSmall &&
                            <h5 className="text-uppercase text-muted mb-3 mb-md-4">
                              $
                              <FormattedNumber
                                value={(initialValueShownHovered || initialValueShown) * PcrUsdPrice}
                                minimumFractionDigits={2}
                                maximumFractionDigits={2}
                              />
                            </h5>
                        }
                    </div>
                    <div>
                        <div className="d-flex justify-content-end">
                            <Styles.StyledDropdownToggle onClick={() => {
                                if (isModal) {
                                    handleHideModal()
                                } else {
                                    handleShowModal(props)
                                }
                            }}>
                                <div className="cursor-pointer card shadow-none mb-2 bg-transparent d-none d-md-flex">
                                    <div className="card-body d-flex justify-content-center align-items-center bg-transparent d-flex justify-content-center">
                                        <Icon
                                            component={isModal ? CloseFullscreen : ZoomOutMap}
                                            size={21}
                                        />
                                    </div>
                                </div>
                            </Styles.StyledDropdownToggle>
                            {!isSmall &&
                                <div className="ms-3">
                                    <Styles.StyledDropdownToggle onClick={(e) => {
                                        e.stopPropagation()
                                        setShowTimeSectionDropdown(!showTimeSectionDropdown)
                                    }}>
                                        <div className="cursor-pointer card shadow-none mb-2 bg-transparent d-none d-md-flex">
                                            <div className="card-body d-flex justify-content-center align-items-center bg-transparent d-flex justify-content-center">
                                                {timeSection}
                                            </div>
                                        </div>
                                    </Styles.StyledDropdownToggle>
                                    <Styles.StyledDropdownMenu className={`card chart-timesection-drpdown bg-dark border ${showTimeSectionDropdown ? 'd-block' :'d-none'}`}>
                                        {timeSection !== '1M' && <div onClick={() => setTimeSection('1M')} className="mb-3 text-muted">1M</div>}
                                        {timeSection !== '3M' && <div onClick={() => setTimeSection('3M')} className="mb-3 text-muted">3M</div>}
                                        {timeSection !== '1Y' && <div onClick={() => setTimeSection('1Y')} className="mb-3 text-muted">1Y</div>}
                                    </Styles.StyledDropdownMenu>
                                </div>
                            }
                        </div>

                        {!isSmall &&
                            <div className="mt-3">
                              <ChainLegend
                                series={series}
                                seriesColors={seriesColors}
                              />
                            </div>
                        }
                    </div>
                </div>

                <ApexChart
                    series={series}
                    height={isSmall ? 123 : 320}
                    seriesColors={seriesColors}
                    onMouseEnter={onMouseEnter}
                    borderRadius={isSmall ? 0 : timeSection === '3M' ? 2 : 5}
                    type={chartType}
                    isSmall={isSmall}
                />
            </div>
        </div>
    )
}


export default InfoChart
