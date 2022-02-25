import React, { useState, useCallback, useEffect } from 'react'
import { mainNetProviders } from '@providers/networks'
import { t } from '@lingui/macro'
import * as Styles from './Styles'
import fetchSeries from './mock'
import BarChart from '@components/organisms/chart/bar-chart'
import { SeriesType } from '@components/organisms/chart/bar-chart/bar-chart'
import CurrencyIcon from '@components/atoms/currency-icon'
import { FormattedNumber } from '../../../atoms/number/formatted-number'
import { useFormikContext } from 'formik'
import {InfoDashboardFormType} from '@components/organisms/info-dashboard/info-dashboard'

type TimeSectionState = '1M' | '3M' | '1Y'

const Staking = () => {
    const [totalStaked, setTotalStaked] = useState(0)
    const [showMenu, setShowMenu] = useState(false)
    const [series, setSeries] = useState<SeriesType>([])
    const [timeSection, setTimeSection] = useState<TimeSectionState>('1M')
    const { values } = useFormikContext<InfoDashboardFormType>()

    useEffect(() => {
        const payload = fetchSeries(values.activeFilters, timeSection.toLocaleLowerCase())
        setSeries(payload)
        let stakedValue = 0
        payload.map(p => {
            let initialValue = 0
            const sumWithInitial = p.data.reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                initialValue
            )
            stakedValue+=sumWithInitial
        })
        setTotalStaked(stakedValue)
    }, [values.activeFilters, timeSection])

    const getSeriesColors = ():string[] => {
        const colors = []
        if (values.activeFilters.includes(0)) {
            colors.push('#FFFFFF')
        } else {
            values.activeFilters.map(a => {
                colors.push(mainNetProviders[a].color)
            })
        }
        return colors
    }

    const onMouseEnter = useCallback((MouseEvent, chartContext, config) => {

    }, []) // No dependencies

    const onMouseLeave = useCallback(() => {

    }, []) // No dependencies

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className="text-uppercase text-muted mb-3 mb-md-4">{t`Staking TVL`}</h5>
                        <div className="d-flex align-items-baseline">
                            <h2 className="display-4 fw-normal d-flex mb-2">
                                <FormattedNumber
                                    value={totalStaked}
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
                                value={totalStaked * 0.025}
                                minimumFractionDigits={2}
                                maximumFractionDigits={2}
                            />
                        </h5>
                    </div>
                    <div className="d-flex">
                        <Styles.StyledDropdownComponent>
                            <Styles.StyledDropdownToggle>
                                <div className="cursor-pointer card shadow-none mb-2 bg-transparent d-none d-md-flex">
                                    <div className="card-body d-flex justify-content-center align-items-center bg-transparent d-flex justify-content-center">
                                        {timeSection}
                                    </div>
                                </div>
                            </Styles.StyledDropdownToggle>
                            <Styles.StyledDropdownMenu show={showMenu} className="bg-dark border">
                                {timeSection !== '1M' && <div onClick={() => setTimeSection('1M')} className="mb-3 text-muted">1M</div>}
                                {timeSection !== '3M' && <div onClick={() => setTimeSection('3M')} className="mb-3 text-muted">3M</div>}
                                {timeSection !== '1Y' && <div onClick={() => setTimeSection('1Y')} className="mb-3 text-muted">Y</div>}
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
                    colors={getSeriesColors()}
                    borderRadius={timeSection === '3M' ? 2 : 8}
                />

            </div>
        </div>
    )
}

export default Staking
