import React, { useState, useEffect } from 'react'
import { mainNetProviders } from '@providers/networks'
import { t } from '@lingui/macro'
import * as Styles from './Styles'
import ApexChart from '@components/organisms/chart/apex-chart'
import { SeriesType } from '@components/organisms/chart/apex-chart/apex-chart'
import CurrencyIcon from '@components/atoms/currency-icon'
import ChainLegend from '@components/organisms/info-dashboard/chain-legend'
import { FormattedNumber } from '../../../atoms/number/formatted-number'
import { FormikValues, useFormikContext } from 'formik'
import { InfoDashboardFormType } from '@components/organisms/info-dashboard/info-dashboard'
import Icon from '@components/atoms/icon'
import { ArrowDropDown, ZoomOutMap, CloseFullscreen } from '@styled-icons/material-outlined'

type TimeSectionState = '1M' | '3M' | '1Y'

export interface InfoChartProps {
    headline?: string
    isSmall?: boolean
    fetchSeries?: (activeFilters: FormikValues, timeSection: string) => any[]
    type: 'line' | 'area' | 'bar'
    isModal?: boolean
    handleShowModal?: (InfoChartProps) => void
    handleHideModal?: () => void
}

const InfoChart = (props: InfoChartProps) => {
    const {
        isSmall,
        headline,
        fetchSeries,
        type,
        isModal,
        handleShowModal,
        handleHideModal
    } = props

    const PcrUsdPrice = 0.025 // TODO FETCH REAL PRICE
    const [totalValue, setTotalValue] = useState<number>(0)
    const [totalHovered, setTotalHovered] = useState<any>(null)
    const [showTimeSectionDropdown, setShowTimeSectionDropdown] = useState<boolean>(false)
    const [series, setSeries] = useState<SeriesType>([])
    const [seriesColors, setSeriesColors] = useState<string[]>(['#FFFFFF'])
    const [timeSection, setTimeSection] = useState<TimeSectionState>('1M')
    const { values, setFieldValue } = useFormikContext<InfoDashboardFormType>()

    useEffect(() => {
        const payload = fetchSeries(values.activeFilters, timeSection.toLocaleLowerCase())
        let total = 0
        const colors = []
        payload.map(p => {
            if (p.chainId === 0) {
                //@ts-ignore
                p.name = t`All Chains`
                colors.push('#FFFFFF')
            } else {
                colors.push(mainNetProviders[p.chainId].color)
                p.name = mainNetProviders[p.chainId].chainName
            }
            const reduced = p.data.reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0
            )
            total+=reduced
        })
        setSeriesColors(colors)
        setSeries(payload)
        setTotalValue(total)
    }, [values.activeFilters, timeSection])

    useEffect(() => {
        document.addEventListener('click', function() {
            setShowTimeSectionDropdown(false)
        })
    }, [])

    const onMouseEnter = (MouseEvent, chartContext, config) => {
        console.log(MouseEvent, chartContext, config)
        const dataPointIndex = config.dataPointIndex
        const seriesIndex = config.seriesIndex
        if (dataPointIndex === -1 || seriesIndex === -1) {
            setTotalHovered(null)
            return
        }
        const hoveredSeries = series[seriesIndex]
        if (!hoveredSeries) {
            return
        }
        const staked = hoveredSeries.data[dataPointIndex]
        setTotalHovered(staked)
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
                                    value={totalHovered || totalValue}
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
                                value={(totalHovered || totalValue) * PcrUsdPrice}
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
                                            size={20}
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
                                                <Icon
                                                    component={ArrowDropDown}
                                                    size={20}
                                                />
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
                    borderRadius={isSmall ? 0 : timeSection === '3M' ? 2 : 8}
                    type={type}
                    isSmall={isSmall}
                />
            </div>
        </div>
    )
}


export default InfoChart
