import React, { useState, useEffect } from 'react'
import { infoChartProviders } from '@providers/networks'
import { useFormikContext } from 'formik'
import * as Styles from './Styles'
import api from '../../../../api'
import ApexChart from '@components/organisms/chart/apex-chart'
import { SeriesType } from '@components/organisms/chart/apex-chart/types'
import CurrencyIcon from '@components/atoms/currency-icon'
import ChainLegend from '@components/organisms/analytics-dashboard/chain-legend'
import { FormattedNumber } from '../../../atoms/number/formatted-number'
import { InfoDashboardFormType, InfoChartProps, TimeSectionStateType } from '../types'
import Icon from '@components/atoms/icon'
import { ZoomOutMap, CloseFullscreen } from '@styled-icons/material-outlined'
import { t } from '@lingui/macro'
import moment from 'moment'
import { useIntl } from 'react-intl'


const InfoChart = (props: InfoChartProps) => {
    const {
        isSmall,
        headline,
        dataType,
        chartType,
        isModal,
        handleShowModal,
        showTotalSumAsTitle = false,
        handleHideModal
    } = props

    const { formatNumber } = useIntl()
    const [initialValueShown, setInitialValueShown] = useState<number>(0)
    const [initialValueShownHovered, setInitialValueShownHovered] = useState<any>(null)
    const [initialDateShown, setInitialDateShown] = useState<string>('')
    const [initialDateShownHovered, setInitialDateShownHovered] = useState<string>('')
    const [showTimeSectionDropdown, setShowTimeSectionDropdown] = useState<boolean>(false)
    const [series, setSeries] = useState<SeriesType>([])
    const [seriesColors, setSeriesColors] = useState<string[]>(['#FFFFFF'])
    const [timeSection, setTimeSection] = useState<TimeSectionStateType>('1M')
    const { values } = useFormikContext<InfoDashboardFormType>()

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
        let initialDate = ''
        const transformedChartSeries: SeriesType = []
        let colors = []

        // if chainId filter selection contains 0 it must be all
        if (values.selectedChains.includes(0)) {
            const allChartValues = chartData.map(a => Number(a.data.substring(0, a.data.length - 18)))
            const allChartValuesDates = chartData.map(a => moment(a.timestamp * 1000).format('MM/DD/YYYY'))
            transformedChartSeries.push({
                chainId: 0,
                data: allChartValues,
                name: t`All Chains`,
                dates: allChartValuesDates
            })
            //colors.push('#FFFFFF')
            colors.push(infoChartProviders[137].color)
        } else {
            values.selectedChains.map(chainId => {
                const filteredByChainId = chartData.filter(f => f.chainId === chainId)
                if (filteredByChainId) {
                    const valuesByChainId = filteredByChainId.map(a => Number(a.data.substring(0, a.data.length - 18)))
                    const datesByChainId = filteredByChainId.map(a => moment(a.timestamp * 1000).format('MM/DD/YYYY'))
                    transformedChartSeries.push({
                        chainId: chainId,
                        data: valuesByChainId,
                        name: infoChartProviders[chainId].chainName,
                        dates: datesByChainId
                    })
                    colors.push(infoChartProviders[chainId].color)
                }
            })
        }
        if (showTotalSumAsTitle) {
            transformedChartSeries.map(series => {
                initialValue += series.data.reduce(
                    (previousValue, currentValue) => previousValue + currentValue,
                    0
                )
            })
        } else {
            transformedChartSeries.map(series => {
                if (series.data.length) {
                    initialValue = series.data[series.data.length - 1]
                    initialDate = series.dates[series.data.length - 1]
                }
            })
        }

        setSeriesColors(colors)
        setSeries(transformedChartSeries)
        setInitialValueShown(initialValue)
        setInitialDateShown(initialDate)
    }

    const onMouseMove = (MouseEvent, chartContext, config) => {
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
        const value = hoveredSeries.data[dataPointIndex]
        const date = hoveredSeries.dates[dataPointIndex]
        setInitialValueShownHovered(value)
        setInitialDateShownHovered(date)
    }

    const onMouseLeave = () => {
        setInitialValueShownHovered(null)
        setInitialDateShownHovered('')
    }

    const renderToolTip = (series, seriesIndex, dataPointIndex, w) => {
        const seriesValue = formatNumber(w.globals.initialSeries[seriesIndex].data[dataPointIndex])
        const seriesDate = w.globals.initialSeries[seriesIndex].dates[dataPointIndex]
        return (
            '<div class="apexcharts-tooltip-series-group d-block" style="font-size: 12px">' +
                '<div class="d-flex align-items-center">' +
                    '<div class="apexcharts-tooltip-text">' +
                        '<div>' +
                            '<div class="apexcharts-tooltip-text-y-label d-flex">'+seriesValue+' PCR' +
                            '</div>' +
                            '<span class="text-muted">' + seriesDate + '</span>' +
                        '</div>' +
                    '</div>'+
                '</div>'+
            '</div>'
        )
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
                        <h6 style={isSmall ? {fontSize: '12px'} : null} className="text-uppercase text-muted mb-0">
                            {initialDateShownHovered || initialDateShown}
                        </h6>
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
                            {/*
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
                            */
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
                    height={isSmall ? 123 : 367}
                    seriesColors={seriesColors}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    borderRadius={isSmall ? 0 : timeSection === '3M' ? 2 : 5}
                    type={chartType}
                    isSmall={isSmall}
                    renderToolTip={renderToolTip}
                />
            </div>
        </div>
    )
}


export default InfoChart
