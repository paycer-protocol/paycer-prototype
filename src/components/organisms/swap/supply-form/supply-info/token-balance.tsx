import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from '@lingui/macro'
import * as Styles from '../../Styles'
import CurrencyIcon from '@components/atoms/currency-icon'

const TokenBalance = () => {
    const { values } = useFormikContext<SupplyProps>()

    /* TODO GET TOTAL DAILY REWARDS */
    const poolNumber = 6
    const totalDailyRewards = 750000 / poolNumber

    return (
        <>
            <Styles.CurrencyInputLabel>
                {t`Token Balance`}
            </Styles.CurrencyInputLabel>
            <div className="d-flex align-items-center mb-2">
                <CurrencyIcon
                    symbol={values.marketPair.token0.symbol}
                    className="me-2"
                    width={20}
                    height={20}
                />
                <div className="d-flex align-items-center">
                    {values.token0Balance}
                    &nbsp;
                    {values.marketPair.token0.symbol}
                </div>
            </div>
            <div className="d-flex align-items-center">
                <CurrencyIcon
                    symbol={values.marketPair.token1.symbol}
                    className="me-2"
                    width={20}
                    height={20}
                />
                <div className="d-flex align-items-center">
                    {values.token1Balance}
                    &nbsp;
                    {values.marketPair.token1.symbol}
                </div>
            </div>
        </>
    )
}

export default TokenBalance