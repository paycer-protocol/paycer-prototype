import React, { useState, useCallback, useEffect } from 'react'
import { t } from '@lingui/macro'
import * as Styles from './Styles'
import fetchSeries from './mock'
import BarChart from '@components/organisms/chart/bar-chart'
import { SeriesType } from '@components/organisms/chart/bar-chart/bar-chart'
import CurrencyIcon from '@components/atoms/currency-icon'
import { FormattedNumber } from '../../../atoms/number/formatted-number'
import {useInfoDashboard} from "@context/info-dashboard-context";

const Staking = () => {

    const stakedTotal = 4300000
    const [stakedValue, setStakedValue] = useState(stakedTotal)
    const [series, setSeries] = useState<SeriesType>([])
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [dataLabel, setDataLabel] = useState<string>(t`1M`)
    const { updateFilters, activeFilters } = useInfoDashboard()

    useEffect(() => {
        const payload = fetchSeries(activeFilters, 'all')
        setSeries(payload)
    }, [])

    useEffect(() => {
        const payload = fetchSeries(activeFilters, dataLabel.toLocaleLowerCase())
        setSeries(payload)
    }, [updateFilters])

    const onMouseEnter = useCallback((MouseEvent, chartContext, config) => {

    }, []) // No dependencies

    const onMouseLeave = useCallback(() => {

    }, []) // No dependencies

    const setByDays = () => {

        setDataLabel(t`ALL`)
    }

    const setByWeek = () => {

        setDataLabel(t`W`)
    }

    const setByMonth = () => {

        setDataLabel(t`1M`)
    }

    const setByYear = () => {

        setDataLabel(t`Y`)
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className="text-uppercase text-muted mb-3 mb-md-4">{t`Staking TVL`}</h5>
                        <div className="d-flex align-items-baseline">
                            <h2 className="display-4 fw-normal d-flex mb-2">
                                <FormattedNumber
                                    value={stakedValue}
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={2}
                                />
                                <CurrencyIcon
                                    symbol="PCR"
                                    className="position-relative"
                                    width={28}
                                    height={28}
                                    style={{left: '8px', top: '2px'}}
                                />
                            </h2>
                        </div>

                        <h5 className="text-uppercase text-muted mb-3 mb-md-4">
                            $
                            <FormattedNumber
                                value={stakedValue * 0.025}
                                minimumFractionDigits={2}
                                maximumFractionDigits={2}
                            />
                        </h5>
                    </div>
                    <div className="d-flex">
                        <Styles.StyledDropdownComponent>
                            <Styles.StyledDropdownToggle>
                                <div className="cursor-pointer card shadow-none mb-2 bg-transparent d-none d-md-flex ms-3">
                                    <div className="card-body d-flex justify-content-center align-items-center bg-transparent d-flex justify-content-center">
                                        {dataLabel}
                                    </div>
                                </div>
                            </Styles.StyledDropdownToggle>
                            <Styles.StyledDropdownMenu show={showDropdown} className="bg-dark border">
                                {dataLabel !== t`1M` && <div onClick={() => setByMonth()} className="mb-3 text-muted">1M</div>}
                                {dataLabel !== t`W` && <div onClick={() => setByWeek()} className="mb-3 text-muted">W</div>}
                                {dataLabel !== t`Y` && <div onClick={() => setByYear()} className="mb-3 text-muted">Y</div>}
                                {dataLabel !== t`ALL` && <div onClick={() => setByDays()} className="mb-3 text-muted">ALL</div>}
                            </Styles.StyledDropdownMenu>
                        </Styles.StyledDropdownComponent>
                    </div>
                </div>

                <BarChart
                    categories={[]}
                    series={series}
                    height={400}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />

            </div>
        </div>
    )
}

export default Staking
