import React, { useState } from 'react'
import BarChart from '@components/organisms/chart/bar-chart'
import { BarChartProps } from '@components/organisms/chart/bar-chart/bar-chart'
import * as Styles from './Styles'
import {t} from "@lingui/macro";
import CurrencyIcon from "@components/atoms/currency-icon";
import {FormattedNumber} from "../../../atoms/number/formatted-number";

const Staking = () => {
    const [stakedTotal, setStakedTotal] = useState(4300000)

    const onMouseEnter = (event: MouseEvent, chartContext, config) => {

        console.log(event, chartContext, config)

    }

    const yearData = {
        categories: [
            'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'
        ],
        series: [
            50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000, 160000
        ]
    }

    const randomMonthValues = Array.apply(null, Array(30)).map(function(item, index){
        return Math.floor(Math.random() * 10000000)
    })

    const monthData = {
        categories: [],
        series: randomMonthValues
    }

    const weekData = {
        categories: [],
        series: [
            11, 22, 33, 33, 88, 55, 22, 100, 22, 77, 22, 44,
            11, 22, 33, 66, 88, 55, 22, 100, 22, 77, 55, 11,
            11, 22, 33, 77, 88, 55, 22, 100, 22, 77, 77, 55,
            11, 22, 33, 22, 88, 55, 44, 100, 22, 77, 88, 11,
        ]
    }

    const randomDayValues = Array.apply(null, Array(356)).map(function(item, index){
        return Math.floor(Math.random() * 1000000)
    })

    const dayData = {
        categories: [],
        series: randomDayValues
    }

    const setByDays = () => {
        setData(dayData)
        setDataLabel(t`ALL`)
        setShowDropdown(false)
    }

    const setByWeek = () => {
        setData(weekData)
        setDataLabel(t`W`)
        setShowDropdown(false)
    }

    const setByMonth = () => {
        setData(monthData)
        setDataLabel(t`1M`)
        setShowDropdown(false)
    }

    const setByYear = () => {
        setData(yearData)
        setDataLabel(t`Y`)
        setShowDropdown(false)
    }

    const [data, setData] = useState<BarChartProps>(monthData)
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [dataLabel, setDataLabel] = useState<string>(t`1M`)

    return (
        <div className="card border-purple-dark">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className="text-uppercase text-muted mb-3 mb-md-4">{t`Staking TVL`}</h5>
                        <div className="d-flex align-items-baseline">
                            <h2 className="display-4 fw-normal d-flex me-4">
                                <CurrencyIcon
                                    symbol="PCR"
                                    className="me-3"
                                    width={32}
                                    height={32}
                                />
                                <FormattedNumber
                                    value={stakedTotal}
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={2}
                                />
                            </h2>
                            <h2 className="display-4 fw-normal d-flex">
                                <CurrencyIcon
                                    symbol="USD"
                                    className="me-3"
                                    width={32}
                                    height={32}
                                />
                                <FormattedNumber
                                    value={stakedTotal * 0.025}
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={2}
                                />
                            </h2>
                        </div>

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
                    categories={data.categories}
                    series={data.series}
                    height={400}
                    onMouseEnter={onMouseEnter}
                />
            </div>
        </div>
    )
}

export default Staking
