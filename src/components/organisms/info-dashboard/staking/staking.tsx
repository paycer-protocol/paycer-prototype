import React, { useState, useCallback, useEffect } from 'react'
import { mainNetProviders } from '@providers/networks'
import { t } from '@lingui/macro'
import * as Styles from './Styles'
import BarChart from '@components/organisms/chart/bar-chart'
import { SeriesType } from '@components/organisms/chart/bar-chart/bar-chart'
import CurrencyIcon from '@components/atoms/currency-icon'
import ChainLegend from '@components/organisms/info-dashboard/chain-legend'
import { FormattedNumber } from '../../../atoms/number/formatted-number'
import { FormikValues, useFormikContext } from 'formik'
import { InfoDashboardFormType } from '@components/organisms/info-dashboard/info-dashboard'

type TimeSectionState = '1M' | '3M' | '1Y'

export interface StackedBarChartProps {
    headline?: string
    isSmall?: boolean
    fetchSeries: (activeFilters: FormikValues, timeSection: string) => any[]
}

const StackedBarChart = (props: StackedBarChartProps) => {
    const {
        isSmall,
        headline,
        fetchSeries
    } = props

    const PcrUsdPrice = 0.025
    const [totalValue, setTotalValue] = useState<number>(0)
    const [totalHovered, setTotalHovered] = useState<any>(null)
    const [series, setSeries] = useState<SeriesType>([])
    const [timeSection, setTimeSection] = useState<TimeSectionState>('1M')
    const { values } = useFormikContext<InfoDashboardFormType>()

    useEffect(() => {
        const payload = fetchSeries(values.activeFilters, timeSection.toLocaleLowerCase())
        let total = 0
        payload.map(p => {
            if (p.chainId === 0) {
                //@ts-ignore
                p.name = t`All Chains`
            } else {
                //@ts-ignore
                p.name = mainNetProviders[p.chainId].chainName
            }
            const reduced = p.data.reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0
            )
            total+=reduced
        })
        setTotalValue(total)
        setSeries(payload)
    }, [values.activeFilters, timeSection])

    const onMouseEnter = (MouseEvent, chartContext, config) => {
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
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className={`text-uppercase text-muted ${isSmall ? 'mb-2' : 'mb-3 mb-md-4'}`}>{headline}</h5>
                        <div className="d-flex align-items-baseline">
                            <h2 className="display-4 fw-normal d-flex mb-2" style={isSmall ? {fontSize: '12px'} : null}>
                                <FormattedNumber
                                    value={totalHovered || totalValue}
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={2}
                                />
                                <CurrencyIcon
                                    symbol="PCR"
                                    className="position-relative"
                                    width={isSmall ? 12 : 28}
                                    height={isSmall ? 12 : 28}
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
                            <Styles.StyledDropdownComponent>
                                <Styles.StyledDropdownToggle>
                                    <div className="cursor-pointer card shadow-none mb-2 bg-transparent d-none d-md-flex">
                                        <div className="card-body d-flex justify-content-center align-items-center bg-transparent d-flex justify-content-center">
                                            {timeSection}
                                        </div>
                                    </div>
                                </Styles.StyledDropdownToggle>
                                <Styles.StyledDropdownMenu className="bg-dark border">
                                    {timeSection !== '1M' && <div onClick={() => setTimeSection('1M')} className="mb-3 text-muted">1M</div>}
                                    {timeSection !== '3M' && <div onClick={() => setTimeSection('3M')} className="mb-3 text-muted">3M</div>}
                                    {timeSection !== '1Y' && <div onClick={() => setTimeSection('1Y')} className="mb-3 text-muted">1Y</div>}
                                </Styles.StyledDropdownMenu>
                            </Styles.StyledDropdownComponent>
                        </div>

                        {!isSmall &&
                            <div className="mt-3">
                              <ChainLegend
                                series={series}
                                colors={values.colors}
                              />
                            </div>
                        }
                    </div>
                </div>

                <BarChart
                    series={series}
                    height={isSmall ? 128 : 320}
                    colors={values.colors}
                    onMouseEnter={onMouseEnter}
                    borderRadius={isSmall ? 0 : timeSection === '3M' ? 2 : 8}
                />

            </div>
        </div>
    )
}


export default StackedBarChart
